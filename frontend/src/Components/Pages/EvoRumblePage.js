// ajout changement
import anime from 'animejs';

import ball from '../../assets/evoBall.png';

import adraqua from '../../img/evoMonsters/EAU/Adraqua.png';
import carchateur from '../../img/evoMonsters/EAU/Carchateur.png';
import diawing from '../../img/evoMonsters/EAU/Diawing.png';
import etheragli from '../../img/evoMonsters/EAU/Etheragli.png';
import jurazur from '../../img/evoMonsters/EAU/Jurazur.png';

import cadalight from '../../img/evoMonsters/ELECTRIC/Cadalight.png';
import cranemeur from '../../img/evoMonsters/ELECTRIC/Cranenemeur.png';
import minjastic from '../../img/evoMonsters/ELECTRIC/Minjastic.png';
import nidoflash from '../../img/evoMonsters/ELECTRIC/Nidoflash.png';
import poctali from '../../img/evoMonsters/ELECTRIC/Poctali.png';

import blazesaur from '../../img/evoMonsters/FEU/Blazesaur.png';
import flameo from '../../img/evoMonsters/FEU/Flameo.png';
import leviadrake from '../../img/evoMonsters/FEU/Leviadrake.png';
import morsaking from '../../img/evoMonsters/FEU/Morsaking.png';
import pichouli from '../../img/evoMonsters/FEU/Pichouli.png';

import biolux from '../../img/evoMonsters/PLANTE/Biolux.png';
import chloropteryx from '../../img/evoMonsters/PLANTE/Chloropteryx.png';
import foliodragon from '../../img/evoMonsters/PLANTE/Foliodragon.png';
import petaleon from '../../img/evoMonsters/PLANTE/Petaleon.png';
import phylornis from '../../img/evoMonsters/PLANTE/Phylornis.png';

import evolika from '../../img/evoMonsters/SOL/Evolika.png';
import fulgureon from '../../img/evoMonsters/SOL/Fulgureon.png';
import mohawk from '../../img/evoMonsters/SOL/Mohawk.png';
import mologround from '../../img/evoMonsters/SOL/Mologround.png';
import soleraptor from '../../img/evoMonsters/SOL/Soleraptor.png';

import airzure from '../../img/evoMonsters/VOL/Airzure.png';
import carchadrak from '../../img/evoMonsters/VOL/Carchadrak.png';
import cornoiseau from '../../img/evoMonsters/VOL/Cornoiseau.png';
import ectoraptor from '../../img/evoMonsters/VOL/Ectoraptor.png';
import libeoh from '../../img/evoMonsters/VOL/Libeoh.png';

import background from '../../img/background.png';
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const dicoImg = {
  Adraqua: adraqua,
  Carchateur: carchateur,
  Diawing: diawing,
  Etheragli: etheragli,
  Jurazur: jurazur,

  Cadalight: cadalight,
  Cranemeur: cranemeur,
  Minjastic: minjastic,
  Nidoflash: nidoflash,
  Poctali: poctali,

  Blazesaur: blazesaur,
  Flameo: flameo,
  Leviadrake: leviadrake,
  Morsaking: morsaking,
  Pichouli: pichouli,

  Biolux: biolux,
  Chloropteryx: chloropteryx,
  Foliodragon: foliodragon,
  Petaleon: petaleon,
  Phylornis: phylornis,

  Evolika: evolika,
  Fulgureon: fulgureon,
  Mohawk: mohawk,
  Mologround: mologround,
  Soleraptor: soleraptor,

  Airzure: airzure,
  Carchadrak: carchadrak,
  Cornoiseau: cornoiseau,
  Ectoraptor: ectoraptor,
  Libeoh: libeoh,
};

const gameState = {
  firstPlayerTeam: [],
  opponentTeam: [],
  activeMonsterPlayer: null,
  opponentActiveMonster: null,
  attacksAndDamages: [],
  baseLifeTeam1:0,
  baseLifeTeam2:0,
};
const NewPage = () => {
  clearPage();
  creationParties();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  main.className = 'text-center mt-5 pt-5';
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
  gameState.firstPlayerTeam = [];
  gameState.opponentTeam = [];
  gameState.activeMonsterPlayer = null;
  gameState.opponentActiveMonster = null;
  gameState.attacksAndDamages = [];
  try {
    const response = await fetch('/api/evoRumble');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const monsterAndAttack = await response.json();
    const monstres = monsterAndAttack.allMonsters;
    const nbMonstresParEquipe = 4;
    gameState.attacksAndDamages = monsterAndAttack.allAttacks;

    // création des équipes avec des monstres au hasard
    // essayer de faire ne sorte qu'il n'y ai que des monstres différents
    for (let i = 0; i < nbMonstresParEquipe; i += 1) {
      const randomIndex1 = Math.floor(Math.random() * monstres.length);
      const randomIndex2 = Math.floor(Math.random() * monstres.length);
      const monstre1 = { ...monstres[randomIndex1] };
      const monstre2 = { ...monstres[randomIndex2] };
      gameState.firstPlayerTeam.push(monstre1);
      gameState.opponentTeam.push(monstre2);
    }

    [gameState.activeMonsterPlayer] = gameState.firstPlayerTeam;
    [gameState.opponentActiveMonster] = gameState.opponentTeam;
    gameState.baseLifeTeam1 = gameState.activeMonsterPlayer.pointsDeVie;
    gameState.baseLifeTeam2 = gameState.opponentActiveMonster.pointsDeVie;

    // historique remis à zero
    historique.id = 'hist';
    historique.innerHTML =
      '<div class="text-decoration-underline">Historique des attaques éffectuées:</div>';
    renderGameState();
  } catch (err) {
    console.error('showAllMonsters::error: ', err);
    throw err;
  }
}

// function to find the damage associated with the attack
function getDamage(attackName) {
  const attackDamage = gameState.attacksAndDamages.find(
    (attackAndDamage) => attackAndDamage.name === attackName,
  );
  return attackDamage;
}

function renderGameState() {
  const main = document.querySelector('main');
  // si l'une des équipes n'a plus de monstres => fin de partie
  if (gameState.opponentTeam.length === 0 || gameState.firstPlayerTeam.length === 0) {
    main.innerHTML = `La partie est terminée<br>`;
    renderGoBackHomeButton();
  } else {
    // eslint-disable-next-line no-unused-vars
    const nomMonstre1 = gameState.activeMonsterPlayer.nom;
    // eslint-disable-next-line no-unused-vars
    const nomMonstre2 = gameState.opponentActiveMonster.nom;
    console.log(`EQ1: ${nomMonstre1}`);
    console.log(`EQ2: ${nomMonstre2}`);
    main.innerHTML = `<div class="container bg-white text-center mt-5">
<div class="row">
  <div class="col gameWindow m-1 border bg-image" style="background-image: url(${background}); background-size: cover; background-position: center;">
    
    <div id="opponent">
      <div id="info">
        <div id="nameOpponent">
          ${nomMonstre2}
        </div>

        <div id="opponentLifeBar">
          <div id="vieRemplieOpponent"></div>
        </div>

        ${getHtmlNbMonster(gameState.opponentTeam.length)}


      </div>

      <div  id="monstre_2">
        <img src="${dicoImg[nomMonstre2]}" class="img-fluid float-right">
      </div>
    </div>

    <div id="spacebetween"></div>

    <div id="player">
      <div id="monstre_1">
            <img src="${dicoImg[nomMonstre1]}" class="img-fluid float-left">
      </div>

      <div id="info">
        <div id="namePlayer">
          ${nomMonstre1}
        </div>
        <div id="playerLifeBar">
          <div id="vieRempliePlayer"></div>
        </div>

        ${getHtmlNbMonster(gameState.firstPlayerTeam.length)}

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

    mettreAJourBarreDeVie(getPourcentageLifeLeft(gameState.opponentActiveMonster.pointsDeVie, gameState.baseLifeTeam2), 1);
    mettreAJourBarreDeVie(getPourcentageLifeLeft(gameState.activeMonsterPlayer.pointsDeVie, gameState.baseLifeTeam1), 2);
    // animation du monstre de l'équipe 1
    anime({
      targets: perso1,
      translateY: [
        { value: '-10px', duration: 1500, easing: 'easeInOutQuad' }, // Déplacement vers le haut
        { value: '0px', duration: 1500, easing: 'easeInOutQuad' }, // Retour vers le bas
      ],
      easing: 'linear', // Utiliser 'linear' pour un mouvement fluide
      loop: true,
    });

    // animation du monstre de l'équipe 2
    anime({
      targets: perso2,
      translateY: [
        { value: '-10px', duration: 1400, easing: 'easeInOutQuad' }, // Déplacement vers le haut
        { value: '0px', duration: 1400, easing: 'easeInOutQuad' }, // Retour vers le bas
      ],
      easing: 'linear', // Utiliser 'linear' pour un mouvement fluide
      loop: true,
    });

    document.querySelector('.history').appendChild(historique);
    

    // création des boutons pour qu'un joueur puisse attaquer en fonction de son pokémon
    const divAttack = document.createElement('div');
    for (let i = 0; i < 4; i += 1) {
      const attackName = gameState.activeMonsterPlayer.attaques[i];
      const atk = document.createElement('button');
      const atkProperties = getDamage(attackName);
      atk.className = `btn btn-dark m-1 ${atkProperties.type}`;
      atk.innerHTML = `<div class="nom">${attackName} </div><div class="damage">${atkProperties.damage} damage </div><div class="type"> (${atkProperties.type})</div>`;
      atk.addEventListener('click', (e) => {
        const nbDegats = atkProperties.damage;

        const nom = e.currentTarget.querySelector('.nom').innerHTML;

        switch (true) {
          case gameState.opponentActiveMonster.faiblesses.includes(atkProperties.type):
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats *
              2} pv<br>`;
            gameState.opponentActiveMonster.pointsDeVie -= nbDegats * 2;
            break;

          case gameState.opponentActiveMonster.resistances.includes(atkProperties.type):
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats /
              2} pv<br>`;
            gameState.opponentActiveMonster.pointsDeVie -= nbDegats / 2;
            break;

          default:
            historique.innerHTML += `Le joueur 1 a joué ${nom} pour une valeur de ${nbDegats} pv<br>`;
            gameState.opponentActiveMonster.pointsDeVie -= nbDegats;
            break;
        }

        mettreAJourBarreDeVie(getPourcentageLifeLeft(gameState.opponentActiveMonster.pointsDeVie, gameState.baseLifeTeam2), 1);
      

        if (gameState.opponentActiveMonster.pointsDeVie <= 0) {
          historique.innerHTML += `<div class="text-danger">EQUIPE 2: Le monstre ${JSON.stringify(
            gameState.opponentActiveMonster.nom,
          )} est mort</div>`;
          const index = gameState.opponentTeam.indexOf(gameState.opponentActiveMonster);
          gameState.opponentTeam.splice(index, 1); 

          // problème quand liste vide
          [gameState.opponentActiveMonster] = gameState.opponentTeam;
          console.log(gameState.opponentActiveMonster);

          // signifie qu'il n'y a plus de monstre dans l'équipe
          if (gameState.opponentActiveMonster !== undefined){
            gameState.baseLifeTeam2 = gameState.opponentActiveMonster.pointsDeVie;
          }
          
        } else {
          playOrdi();
          
          mettreAJourBarreDeVie(getPourcentageLifeLeft(gameState.activeMonsterPlayer.pointsDeVie, gameState.baseLifeTeam1), 2);
          if (gameState.activeMonsterPlayer.pointsDeVie <= 0) {
            historique.innerHTML += `<div class="text-danger">EQUIPE 1: Le monstre ${JSON.stringify(
              gameState.activeMonsterPlayer.nom,
            )} est mort</div>`;
            const index = gameState.firstPlayerTeam.indexOf(gameState.activeMonsterPlayer);
            gameState.firstPlayerTeam.splice(index, 1);
            [gameState.activeMonsterPlayer] = gameState.firstPlayerTeam;
          }
        }
        clearPage();
        renderGameState();
      });
      divAttack.appendChild(atk);
      document.querySelector('.atkButtons').appendChild(divAttack);
    }

    // crétaion des boutons pour permettre de changer parmis les monstres restants
    for (let i = 0; i < gameState.firstPlayerTeam.length; i += 1) {
      if (gameState.firstPlayerTeam[i] !== gameState.activeMonsterPlayer) {
        const monstre = document.createElement('button');
        monstre.className = 'btn btn-info m-1';
        monstre.innerHTML = `${gameState.firstPlayerTeam[i].nom}`;
        monstre.addEventListener('click', () => {
          gameState.activeMonsterPlayer = gameState.firstPlayerTeam[i];
          historique.innerHTML += `<div class="text-success">EQUIPE 1: Le monstre ${JSON.stringify(
            gameState.activeMonsterPlayer.nom,
          )} est entré</div>`;
          document.querySelector('#monstre_2').innerHTML = `<img src="${
            dicoImg[gameState.activeMonsterPlayer.nom]
          }" class="img-fluid float-right">`;
          playOrdi();
          clearPage();
          renderGameState();
        });
        document.querySelector('.atkButtons').appendChild(monstre);
      }
    }
    
    const rageQuit = document.createElement('button');
    rageQuit.innerHTML = `Déclarer forfait`;
    rageQuit.className = `bg-danger btn btn-info m-1 mt-5`;
    rageQuit.addEventListener('click', () => {
      Navigate('/');
    });
    document.querySelector('.quitButton').appendChild(rageQuit);
    // document.querySelector('.quitButton').innerHTML += getHtmlNbMonster(4);
  }

  function playOrdi() {
    const randomAtkIndex = Math.floor(Math.random() * 4);
    let atkOrdi = gameState.opponentActiveMonster.attaques[randomAtkIndex];
    atkOrdi = getDamage(atkOrdi);
    const nbDegatsOrdi = atkOrdi.damage;
    switch (true) {
      case gameState.activeMonsterPlayer.faiblesses.includes(atkOrdi.type):
        historique.innerHTML += `Le joueur 2 a joué ${
          atkOrdi.name
        } pour une valeur de ${nbDegatsOrdi * 2} pv<br>`;
        gameState.activeMonsterPlayer.pointsDeVie -= nbDegatsOrdi * 2;
        break;

      case gameState.activeMonsterPlayer.resistances.includes(atkOrdi.type):
        historique.innerHTML += `Le joueur 2 a joué ${
          atkOrdi.name
        } pour une valeur de ${nbDegatsOrdi / 2} pv<br>`;
        gameState.activeMonsterPlayer.pointsDeVie -= nbDegatsOrdi / 2;
        break;

      default:
        historique.innerHTML += `Le joueur 2 a joué ${atkOrdi.name} pour une valeur de ${nbDegatsOrdi} pv<br>`;
        gameState.activeMonsterPlayer.pointsDeVie -= nbDegatsOrdi;
        break;
    }
  }
}

function mettreAJourBarreDeVie(pourcentage, numberPlayer) {
  const barreDeVieRemplieOpponent = document.getElementById('vieRemplieOpponent');
  const barreDeVieRempliePlayer = document.getElementById('vieRempliePlayer');

  // si le coup à été joué par l'utilisateur
  if (numberPlayer === 1){
    barreDeVieRemplieOpponent.style.width = `${pourcentage}%`;
  }

  else{
    barreDeVieRempliePlayer.style.width = `${pourcentage}%`;
  }
  
}


function getPourcentageLifeLeft(lifeLeft, baseLife){
  return Math.round((lifeLeft/baseLife)*100);
}

// eslint-disable-next-line no-unused-vars
function getHtmlNbMonster(number){
  let strHtml = '<div>';
  for (let i = 0; i < number; i+=1) {
    strHtml += `<img src="${ball}">`
  }
  return `${strHtml}</div>`;
}


export default NewPage;
