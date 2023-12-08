/* nouvelle solution: travailler avec des états(objets clés valeurs)
etats pour chaque nb montres par équipe
etat pour savoir à qui est le tour

gameState = {
  listeMonstresEquipe1 : [],
  listeMonstresEquipe2: [],
  monstreActifEquipe1: ,
  monstreActifEquipe2,
} => aura toutes les valeurs nécessaires pour la partie
après chaque click:
-changer les états si besoin (bloquer partie si besoin => création d'une nouvelle page)
-générer l'html
-jouer un tour de l'ordi si possible


générer  l'html après chaque click en fct du gameState
fin de partie dès que une des équipes est vide 
*/


import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const gameState = {
  listeMonstresEquipe1: [],
  listeMonstresEquipe2: [],
  monstreActifEquipe1: null,
  monstreActifEquipe2: null,
  attacksAndDamages: [],
};
const NewPage = () => {
  clearPage();
  creationParties();
  // renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const submit = document.createElement('input');
  submit.value = 'Retour au menu principal';
  submit.className = 'btn btn-secondary mt-3';
  submit.addEventListener('click', () => {
    Navigate('/');
  });

  main.appendChild(submit);
}

async function creationParties() {
  gameState.listeMonstresEquipe1 = [];
  gameState.listeMonstresEquipe2 = [];
  gameState.monstreActifEquipe1 = null;
  gameState.monstreActifEquipe2 = null;
  gameState.attacksAndDamages = [];
  try {
    const response = await fetch('/api/evoRumble');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const monsterAndAttack = await response.json();
    const monstres = monsterAndAttack.allMonsters;
    const nbMonstresParEquipe = 4;
    gameState.attacksAndDamages = monsterAndAttack.allAttacks;


    // création des équipes avec des monstres au hasard
    for (let i = 0; i < nbMonstresParEquipe; i += 1) {
      const randomIndex1 = Math.floor(Math.random() * monstres.length);
      const randomIndex2 = Math.floor(Math.random() * monstres.length);
      const monstre1 = { ...monstres[randomIndex1] };
      const monstre2 = { ...monstres[randomIndex2] };
      gameState.listeMonstresEquipe1.push(monstre1);
      gameState.listeMonstresEquipe2.push(monstre2);
    }

    [gameState.monstreActifEquipe1] = gameState.listeMonstresEquipe1;
    [gameState.monstreActifEquipe2] = gameState.listeMonstresEquipe2;


    renderGameState();
    
  } catch (err) {
    console.error('showAllMonsters::error: ', err);
    throw err;
  }
}

// historique des attaques lancées et des monstres morts
const historique = document.createElement('div');
historique.id = 'hist';
historique.innerHTML = '<div class="text-decoration-underline">Historique des attaques éffectuées:</div>';


// function to find the damage associated with the attack
   function getDamage(attackName) {
  const attackDamage = gameState.attacksAndDamages.find((attackAndDamage) => attackAndDamage.name === attackName);
  return attackDamage.damage;
}

// question: pq quand j'appuie sur lien new page mes equipes ne se vide pas avant
 function renderGameState() {
  const main = document.querySelector('main');
  // division de la fenêtre en 4
  main.innerHTML = `<div class="container bg-white text-center">
  <div class="row">
    <div class="col gameWindow m-1 border"></div>
    <div class="col  history m-1 border overflow-auto"></div>
    <div class="w-100"></div>
    <div class="col atkButtons m-1 border"></div>
    <div class="col quitButton m-1 border"></div>
  </div>
</div>`;

  // si l'une des équipes n'a plus de monstres => fin de partie
  if (gameState.listeMonstresEquipe2.length === 0 || gameState.listeMonstresEquipe1.length === 0) {
    main.innerHTML = `La partie est terminée<br>`;
    renderGoBackHomeButton();
  } else {
    document.querySelector('.gameWindow').innerHTML += 'EQUIPE 1<br>';

    // affichage du monstre actif des 2 équipes
    document.querySelector('.gameWindow').innerHTML += `Nom monstre actif equipe 1: ${JSON.stringify(gameState.monstreActifEquipe1.nom,)} PV: ${JSON.stringify(gameState.monstreActifEquipe1.pointsDeVie)}<br>`;
    document.querySelector('.gameWindow').innerHTML += `Nom monstre actif equipe 2: ${JSON.stringify(gameState.monstreActifEquipe2.nom,)} PV: ${JSON.stringify(gameState.monstreActifEquipe2.pointsDeVie)}<br>`;
    document.querySelector('.gameWindow').innerHTML += '<br>';
    // affichage des monstres de la première équipe
    for (let i = 0; i < gameState.listeMonstresEquipe1.length; i += 1) {
      document.querySelector('.gameWindow').innerHTML += `Nom: ${JSON.stringify(gameState.listeMonstresEquipe1[i].nom)}<br>`;
      document.querySelector('.gameWindow').innerHTML += `PV: ${JSON.stringify(gameState.listeMonstresEquipe1[i].pointsDeVie)}<br>`;
    }

    document.querySelector('.gameWindow').innerHTML += '<br><br><br><br>EQUIPE 2<br>';
    // affichage des monstres de la deuxième équipe
    for (let i = 0; i < gameState.listeMonstresEquipe2.length; i += 1) {
      document.querySelector('.gameWindow').innerHTML += `Nom: ${JSON.stringify(gameState.listeMonstresEquipe2[i].nom)}<br>`;
      document.querySelector('.gameWindow').innerHTML += `PV: ${JSON.stringify(gameState.listeMonstresEquipe2[i].pointsDeVie)}<br>`;
    }

    document.querySelector('.history').appendChild(historique);

    // création des outons pour qu'un joueur puisse attaquer en fonction de son pokémon
    const divAttack = document.createElement('div')
    for (let i = 0; i < 4; i += 1) {
      const attackName = gameState.monstreActifEquipe1.attaques[i]
      const atk = document.createElement('button');
      atk.className = 'btn btn-dark m-1'
      atk.innerHTML = `${attackName} <br> ${(getDamage(attackName))} damage`;
      atk.addEventListener('click', (e) => {
        const nbDegats = getDamage(attackName);
        historique.innerHTML += `Le joueur 1 a joué ${e.target.innerHTML} pour une valeur de ${nbDegats} pv<br>`;
        gameState.monstreActifEquipe2.pointsDeVie -= nbDegats;
        if (gameState.monstreActifEquipe2.pointsDeVie <= 0) {
          historique.innerHTML += `EQUIPE 2: Le monstre ${JSON.stringify(gameState.monstreActifEquipe2.nom,)} est mort<br>`;
          const index = gameState.listeMonstresEquipe2.indexOf(gameState.monstreActifEquipe2);
          gameState.listeMonstresEquipe2.splice(index, 1);
          [gameState.monstreActifEquipe2] = gameState.listeMonstresEquipe2;
        } else {
          const nbAttaques = 4;
          const randomAtkIndex = Math.floor(Math.random() * nbAttaques);
          historique.innerHTML += `Le joueur 2 a joué ${gameState.monstreActifEquipe2.attaques[randomAtkIndex]} pour une valeur de ${randomAtkIndex * 10 + 5} pv<br>`;
          gameState.monstreActifEquipe1.pointsDeVie -= nbDegats;
          if (gameState.monstreActifEquipe1.pointsDeVie <= 0) {
            historique.innerHTML += `EQUIPE 1: Le monstre ${JSON.stringify(gameState.monstreActifEquipe1.nom,)} est mort<br>`;
            const index = gameState.listeMonstresEquipe1.indexOf(gameState.monstreActifEquipe1);
            gameState.listeMonstresEquipe1.splice(index, 1);
            [gameState.monstreActifEquipe1] = gameState.listeMonstresEquipe1;
          }
        }
        clearPage();
        renderGameState();
      });
      divAttack.appendChild(atk);
      document.querySelector('.atkButtons').appendChild(divAttack);
    }

    // crétaion des boutons pour permettre de changer parmis les monstres restants
    for (let i = 0; i < gameState.listeMonstresEquipe1.length; i += 1) {
      if (gameState.listeMonstresEquipe1[i] !== gameState.monstreActifEquipe1) {
        const monstre = document.createElement('button');
        monstre.className = 'btn btn-info m-1'
        monstre.innerHTML = `${gameState.listeMonstresEquipe1[i].nom}`;
        monstre.addEventListener('click', () => {
          gameState.monstreActifEquipe1 = gameState.listeMonstresEquipe1[i];
          clearPage();
          renderGameState();
        })
        document.querySelector('.atkButtons').appendChild(monstre);
      }
    }
    // faire en sorte que si on change de monstre c'est à l'ordi de jouer
    // faire des fonctions pour que l'ordi joue soit un changement soit une attaque si possible
    const rageQuit = document.createElement('button');
    rageQuit.innerHTML = `Déclarer forfait`;
    rageQuit.className = `bg-danger btn btn-info m-1 mt-5`;
    rageQuit.addEventListener('click', ()  => {
      Navigate('/');
    });
    document.querySelector('.quitButton').appendChild(rageQuit);
  }
}

export default NewPage;
