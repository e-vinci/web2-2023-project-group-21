// ajout changement
import anime from 'animejs';

import adraqua from '../../img/evoMonsters/EAU/Adraqua.png';
import carchateur from '../../img/evoMonsters/EAU/Carchateur.png';
import diawing from '../../img/evoMonsters/EAU/Diawing.png';
import etheragli from '../../img/evoMonsters/EAU/Etheragli.png';
import jurazur from '../../img/evoMonsters/EAU/Jurazur.png';

import cadalight from '../../img/evoMonsters/ELECTRIC/Cadalight.png';
import cranenemeur from '../../img/evoMonsters/ELECTRIC/Cranénemeur.png';
import minjastic from '../../img/evoMonsters/ELECTRIC/Minjastic.png';
import nidoflash from '../../img/evoMonsters/ELECTRIC/Nidoflash.png';
import poctali from '../../img/evoMonsters/ELECTRIC/Poctali.png';

import blazesaur from '../../img/evoMonsters/FEU/Blazesaur.png';
import flameo from '../../img/evoMonsters/FEU/Flameo.png';
import lenuviadrake from '../../img/evoMonsters/FEU/Lenüviadrake.png';
import morsaking from '../../img/evoMonsters/FEU/Morsaking.png';
import pichouli from '../../img/evoMonsters/FEU/Pichouli.png';

import biolux from '../../img/evoMonsters/PLANTE/Biolux.png';
import chloropteryx from '../../img/evoMonsters/PLANTE/Chloropteryx.png';
import foliodragon from '../../img/evoMonsters/PLANTE/Foliodragon.png';
import penutalenuon from '../../img/evoMonsters/PLANTE/Penütalenüon.png';
import phylornis from '../../img/evoMonsters/PLANTE/Phylornis.png';

import evolika from '../../img/evoMonsters/SOL/Evolika.png';
import fulgurenuon from '../../img/evoMonsters/SOL/Fulgurenüon.png';
import mohawk from '../../img/evoMonsters/SOL/Mohawk.png';
import mologround from '../../img/evoMonsters/SOL/Mologround.png';
import soleraptor from '../../img/evoMonsters/SOL/Soleraptor.png';

import airzure from '../../img/evoMonsters/VOL/Airzure.png';
import carchadrak from '../../img/evoMonsters/VOL/Carchadrak.png';
import cornoiseau from '../../img/evoMonsters/VOL/Cornoiseau.png';
import ectoraptor from '../../img/evoMonsters/VOL/Ectoraptor.png';
import libenuoh from '../../img/evoMonsters/VOL/Libenüoh.png';

import background from '../../img/background.png';
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const dicoImg = {
  "Adraqua": adraqua,
  "Carchacteur": carchateur,
  "Diawing": diawing,
  "Etheragli": etheragli,
  "Jurazur": jurazur,

  "Cadalight": cadalight,
  "Cranénemeur": cranenemeur,
  "Minjastic": minjastic,
  "Nidoflash": nidoflash,
  "Poctali": poctali,

  "Blazesaur": blazesaur,
  "Flameo": flameo,
  "Lenüviadrake": lenuviadrake,
  "Morsaking": morsaking,
  "Pichouli": pichouli,

  "Biolux": biolux,
  "Chloropteryx": chloropteryx,
  "Foliodragon": foliodragon,
  "Penütalenüon": penutalenuon,
  "Phylornis": phylornis,

  "Evolika": evolika,
  "Fulgurenüon": fulgurenuon,
  "Mohawk": mohawk,
  "Mologround": mologround,
  "Soleraptor": soleraptor,

  "Airzure": airzure,
  "Carchadrak": carchadrak,
  "Cornoiseau": cornoiseau,
  "Ectoraptor": ectoraptor,
  "Libenüoh": libenuoh
}

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
  main.className = 'text-center mt-5 pt-5'
  const submit = document.createElement('input');
  submit.value = 'Retour au menu principal';
  submit.className = 'btn btn-primary mt-3 mx-2';
  submit.addEventListener('click', () => {
    clearPage();
    Navigate('/');
  });
  const rematch = document.createElement('input');
  rematch.value = 'Rematch';
  rematch.className = 'btn btn-success mt-3 mx-2';
  rematch.addEventListener('click', () => {
    NewPage();
  });


  main.appendChild(submit);
  main.appendChild(rematch);
}

// historique des attaques lancées et des monstres morts
const historique = document.createElement('div');

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

    // historique remis à zero
    historique.id = 'hist';
    historique.innerHTML = '<div class="text-decoration-underline">Historique des attaques éffectuées:</div>';
    renderGameState();

  } catch (err) {
    console.error('showAllMonsters::error: ', err);
    throw err;
  }
}




// function to find the damage associated with the attack
function getDamage(attackName) {
  const attackDamage = gameState.attacksAndDamages.find((attackAndDamage) => attackAndDamage.name === attackName);
  return attackDamage;
}

// question: pq quand j'appuie sur lien new page mes equipes ne se vide pas avant
function renderGameState() {
  const main = document.querySelector('main');
// division de la fenêtre en 4


// eslint-disable-next-line no-unused-vars
const nomMonstre1 = gameState.monstreActifEquipe1.nom;
// eslint-disable-next-line no-unused-vars
const nomMonstre2 = gameState.monstreActifEquipe2.nom
console.log(nomMonstre1);
main.innerHTML = `<div class="container bg-white text-center mt-5">
<div class="row">
  <div class="col gameWindow m-1 border bg-image" style="background-image: url(${background}); background-size: cover; background-position: center;">
    
    <div id="opponent">
      <div  id="monstre_1">
        <img src="${dicoImg.nomMonstre1}" class="img-fluid float-right">
      </div>
    </div>

    <div id="spacebetween"></div>

    <div id="player">
      <div id="monstre_2">
            <img src="${dicoImg.nomMonstre2}" class="img-fluid float-left">
      </div>
    </div>

  </div>

  <div class="col  history m-1 border"></div>
  <div class="w-100"></div>
  <div class="col atkButtons m-1 border"></div>
  <div class="col quitButton m-1 border"></div>
</div>
</div>`;

const perso1 = document.getElementById('monstre_1');
const perso2 = document.getElementById('monstre_2');

// animation du monstre de l'équipe 1
anime({
    targets: perso1,
    translateY: [
        { value: '-10px', duration: 1500, easing: 'easeInOutQuad' }, // Déplacement vers le haut
        { value: '0px', duration: 1500, easing: 'easeInOutQuad' },  // Retour vers le bas
    ],
    easing: 'linear', // Utiliser 'linear' pour un mouvement fluide
    loop: true
});

// animation du monstre de l'équipe 2
anime({
  targets: perso2,
  translateY: [
      { value: '-10px', duration: 1400, easing: 'easeInOutQuad' }, // Déplacement vers le haut
      { value: '0px', duration: 1400, easing: 'easeInOutQuad' },  // Retour vers le bas
  ],
  easing: 'linear', // Utiliser 'linear' pour un mouvement fluide
  loop: true
});

  // si l'une des équipes n'a plus de monstres => fin de partie
  if (gameState.listeMonstresEquipe2.length === 0 || gameState.listeMonstresEquipe1.length === 0) {
    main.innerHTML = `La partie est terminée<br>`;
    renderGoBackHomeButton();
  } else {
    document.querySelector('.history').appendChild(historique);

    // création des outons pour qu'un joueur puisse attaquer en fonction de son pokémon
    const divAttack = document.createElement('div')
    for (let i = 0; i < 4; i += 1) {
      const attackName = gameState.monstreActifEquipe1.attaques[i];
      const atk = document.createElement('button');
      const atkProperties = getDamage(attackName);
      atk.className = `btn btn-dark m-1 ${atkProperties.type}`;
      atk.innerHTML = `<div class="nom">${attackName} </div><div class="damage">${atkProperties.damage} damage </div><div class="type"> (${atkProperties.type})</div>`;
      atk.addEventListener('click', (e) => {
        const nbDegats = atkProperties.damage;

        const nom = e.currentTarget.querySelector('.nom').innerHTML;

        switch (true) {
          case gameState.monstreActifEquipe2.faiblesses.includes(atkProperties.type):
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats * 2} pv<br>`;
            gameState.monstreActifEquipe2.pointsDeVie -= nbDegats * 2;
            break;

          case gameState.monstreActifEquipe2.resistances.includes(atkProperties.type):
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats / 2} pv<br>`;
            gameState.monstreActifEquipe2.pointsDeVie -= nbDegats / 2;
            break;

          default:
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats} pv<br>`;
            gameState.monstreActifEquipe2.pointsDeVie -= nbDegats;
            break;
        }

        if (gameState.monstreActifEquipe2.pointsDeVie <= 0) {
          historique.innerHTML += `<div class="text-danger">EQUIPE 2: Le monstre ${JSON.stringify(gameState.monstreActifEquipe2.nom,)} est mort</div>`;
          const index = gameState.listeMonstresEquipe2.indexOf(gameState.monstreActifEquipe2);
          gameState.listeMonstresEquipe2.splice(index, 1);
          [gameState.monstreActifEquipe2] = gameState.listeMonstresEquipe2;
        } else {
          playOrdi();
          console.log(gameState.monstreActifEquipe1.pointsDeVie);
          if (gameState.monstreActifEquipe1.pointsDeVie <= 0) {
            historique.innerHTML += `<div class="text-danger">EQUIPE 1: Le monstre ${JSON.stringify(gameState.monstreActifEquipe1.nom,)} est mort</div>`;
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
          historique.innerHTML += `<div class="text-success">EQUIPE 1: Le monstre ${JSON.stringify(gameState.monstreActifEquipe1.nom,)} est entré</div>`;
          playOrdi();
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
    rageQuit.addEventListener('click', () => {
      Navigate('/');
    });
    document.querySelector('.quitButton').appendChild(rageQuit);
  }

  function playOrdi() {
    const randomAtkIndex = Math.floor(Math.random() * 4);
    let atkOrdi = gameState.monstreActifEquipe2.attaques[randomAtkIndex];
    atkOrdi = getDamage(atkOrdi);
    const nbDegatsOrdi = atkOrdi.damage;
    switch (true) {
      case gameState.monstreActifEquipe1.faiblesses.includes(atkOrdi.type):
        historique.innerHTML += `Le joueur 2 a joué ${atkOrdi.name} pour une valeur de ${nbDegatsOrdi * 2} pv<br>`;
        gameState.monstreActifEquipe1.pointsDeVie -= nbDegatsOrdi * 2;
        break;

      case gameState.monstreActifEquipe1.resistances.includes(atkOrdi.type):
        historique.innerHTML += `Le joueur 2 a joué ${atkOrdi.name} pour une valeur de ${nbDegatsOrdi / 2} pv<br>`;
        gameState.monstreActifEquipe1.pointsDeVie -= nbDegatsOrdi / 2;
        break;

      default:
        historique.innerHTML += `Le joueur 2 a joué ${atkOrdi.name} pour une valeur de ${nbDegatsOrdi} pv<br>`;
        gameState.monstreActifEquipe1.pointsDeVie -= nbDegatsOrdi;
        break;
    }
  }
}

export default NewPage;
