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
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

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
/* initiation du jeu */
const gameState = {
  firstPlayerTeam: [],
  opponentTeam: [],
  activeMonsterPlayer: null,
  opponentActiveMonster: null,
  attacksAndDamages: [],
  baseLifeListTeam1: [],
  baseLifeListTeam2: [],
  baseLifeTeam1: 0,
  baseLifeTeam2: 0,
};
let authenticatedUser;
const NewPage = () => {
  clearPage();
  creationParties();
  authenticatedUser = getAuthenticatedUser();
};
const main = document.querySelector('main');

// historique des attaques lancées et des monstres morts
const historique = document.createElement('div');
historique.id = 'hist';
let totalHpBotsMonster = 0;
let totalHpPlayerMonster = 0;

async function creationParties() {
  clearGameState();

  try {
    const response = await fetch('/api/evoRumble');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const monsterAndAttack = await response.json();

    // création des équipes avec des monstres au hasard
    // essayer de faire ne sorte qu'il n'y ai que des monstres différents
    teamCreation(monsterAndAttack);

    // historique remis à zero
    clearHistory();

    renderGameState();
  } catch (err) {
    console.error('showAllMonsters::error: ', err);
    throw err;
  }
}
function clearGameState() {
  gameState.firstPlayerTeam = [];
  gameState.opponentTeam = [];
  gameState.activeMonsterPlayer = null;
  gameState.opponentActiveMonster = null;
  gameState.attacksAndDamages = [];
  gameState.baseLifeListTeam1 = [];
  gameState.baseLifeListTeam2 = [];
  gameState.baseLifeTeam1 = 0;
  gameState.baseLifeTeam2 = 0;
}

function clearHistory() {
  historique.innerHTML=''
}

/* création des teams */
function teamCreation(monsterAndAttack) {
  const monstres = monsterAndAttack.allMonsters;
  const nbMonstresParEquipe = 4;
  gameState.attacksAndDamages = monsterAndAttack.allAttacks;
  for (let i = 0; i < nbMonstresParEquipe; i += 1) {
    const randomIndex1 = Math.floor(Math.random() * monstres.length);
    const randomIndex2 = Math.floor(Math.random() * monstres.length);
    const monstre1 = { ...monstres[randomIndex1] };
    const monstre2 = { ...monstres[randomIndex2] };
    gameState.firstPlayerTeam.push(monstre1);
    gameState.opponentTeam.push(monstre2);
    gameState.baseLifeListTeam1.push(monstre1.pointsDeVie);
    gameState.baseLifeListTeam2.push(monstre2.pointsDeVie);
    totalHpPlayerMonster += monstre1.pointsDeVie;
    totalHpBotsMonster += monstre2.pointsDeVie;
  }

  [gameState.activeMonsterPlayer] = gameState.firstPlayerTeam;
  [gameState.opponentActiveMonster] = gameState.opponentTeam;
  gameState.baseLifeTeam1 = gameState.activeMonsterPlayer.pointsDeVie;
  gameState.baseLifeTeam2 = gameState.opponentActiveMonster.pointsDeVie;
}

/** endgame et gestion des scores */
async function getUserScore() {
  try {
    const response = await fetch(
      `/api/score/getScore?username=${encodeURIComponent(authenticatedUser?.username)}`,
    );
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('getLeaderboard::error: ', err);
    throw err;
  }
}

async function updateUserScore(username, score) {
  console.log(`oue oue oue ${username} ${score}`);
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, score }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`/api/score/updateScore`, options);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('getLeaderboard::error: ', err);
    throw err;
  }
}

async function endGame() {
  let userScore;
  let gameOutcomeMessage = '';
  let scoreModifier = 0;

  if (gameState.opponentTeam.length === 0) {
    console.log('tu as gagné');
    gameOutcomeMessage = 'La partie est terminée (tu as gagné)<br>';
    scoreModifier = 1; // Use 1 for the winning case
  } else {
    console.log('tu as perdu');
    gameOutcomeMessage = 'La partie est terminée (tu as perdu)<br>';
    scoreModifier = -1; // Use -1 for the losing case
  }

  if (isAuthenticated()) {
    userScore = await getUserScore();
    userScore +=
      Math.floor(Math.ceil(10 * (totalHpBotsMonster / totalHpPlayerMonster))) * scoreModifier;
      if(userScore <0){
        userScore =0;
      }
    updateUserScore(authenticatedUser?.username, userScore);
  }

  main.innerHTML = gameOutcomeMessage;
  renderGoBackHomeButton();
}

/* création de la page */

function gameWindow() {
  const indexMonsterPlayer1 = gameState.firstPlayerTeam.findIndex(
    (monstre) => monstre.nom === gameState.activeMonsterPlayer.nom,
  );
  const indexMonsterPlayer2 = gameState.opponentTeam.findIndex(
    (monstre) => monstre.nom === gameState.opponentActiveMonster.nom,
  );
  // eslint-disable-next-line no-unused-vars
  const playerMonster = gameState.activeMonsterPlayer;
  // eslint-disable-next-line no-unused-vars
  const opponentMonster = gameState.opponentActiveMonster;
  console.log(`EQ1: ${playerMonster.nom}`);
  console.log(`EQ2: ${opponentMonster.nom}`);

  main.innerHTML = `
    <div class="container text-center mt-5">
      <div class="row">
        <div class="col gameWindow m-1 border bg-image" style="background-image: url(${background}); background-size: cover; background-position: center;">
          <div id="opponent">
            <div id="info">
              <div id="nameOpponent">
                ${opponentMonster.nom}
                (${opponentMonster.type})
                PV: ${opponentMonster.pointsDeVie}/${gameState.baseLifeListTeam2[indexMonsterPlayer2]}
              </div>
                <div id="opponentLifeBar">
                  <div id="vieRemplieOpponent">
                  </div>
                </div>
                ${getHtmlNbMonster(gameState.opponentTeam.length)}
              </div>
              <div id="monstre_oppopnent">
                <img src="${dicoImg[opponentMonster.nom]}" class="img-fluid float-right">
              </div>
            </div>
            <div id="spacebetween">
            </div>
            <div id="player">
              <div id="monstre_player">
                <img src="${dicoImg[playerMonster.nom]}" class="img-fluid float-left img_player">
              </div>
              <div id="info">
                <div id="namePlayer">
                  ${playerMonster.nom}
                  (${playerMonster.type})
                  PV: ${playerMonster.pointsDeVie}/${gameState.baseLifeListTeam1[indexMonsterPlayer1]}
                </div>
                <div id="playerLifeBar">
                  <div id="vieRempliePlayer">
                  </div>
                </div>
                ${getHtmlNbMonster(gameState.firstPlayerTeam.length)}
              </div>
            </div>
          </div>
          <div class="col history m-1 border"></div>
          <div class="w-100 bg-danger"></div>
          <div class="buttons m-1 border">
            <div class="atkButtons"></div>
            <div class="monsterButtons"></div>
          </div>
          <div class="col quitButton m-1 border"></div>
        </div>
      </div>
    </div> `;
    document.querySelector('.atkButtons').innerHTML ='Attaques : <br>';
    document.querySelector('.monsterButtons').innerHTML ='Monstres : <br>';
    const historiqueTitle = document.createElement('div');
    historiqueTitle.innerHTML = 'Historique des attaques éffectuées:';
    historiqueTitle.id = 'hist_title';
    document.querySelector('.history').appendChild(historiqueTitle);
}

/* création des divers bouttons */
function forfeitButton() {
  const rageQuit = document.createElement('button');
  rageQuit.innerHTML = `Déclarer forfait`;
  rageQuit.className = `bg-danger btn btn-info m-1 mt-5`;
  rageQuit.addEventListener('click', () => {
    endGame();
  });
  document.querySelector('.quitButton').appendChild(rageQuit);
}

// création des boutons pour permettre de changer parmis les monstres restants

function monsterButtonCreation() {
  for (let i = 0; i < gameState.firstPlayerTeam.length; i += 1) {
    if (gameState.firstPlayerTeam[i] !== gameState.activeMonsterPlayer) {
      const monstre = document.createElement('button');
      monstre.className = 'btn btn-info m-1';
      monstre.id = `btn-${gameState.firstPlayerTeam[i].type}`;
      monstre.innerHTML = `${gameState.firstPlayerTeam[i].nom}  ${gameState.firstPlayerTeam[i].pointsDeVie}PV<br>
                          (${gameState.firstPlayerTeam[i].type})`;
      monstre.addEventListener('click', () => {
        gameState.activeMonsterPlayer = gameState.firstPlayerTeam[i];
        gameState.baseLifeTeam1 = gameState.baseLifeListTeam1[i];
        historique.insertAdjacentHTML('afterbegin', `<div class="text-success">EQUIPE 1: Le monstre ${JSON.stringify(
          gameState.activeMonsterPlayer.nom,
        )} est entré</div>`);
        document.querySelector('#monstre_player').innerHTML = `<img src="${
          dicoImg[gameState.activeMonsterPlayer.nom]
        }" class="img-fluid float-right">`;
        opponentPlay();
        changeMonsterDeath()
        renderGameState();
      });
      document.querySelector('.monsterButtons').appendChild(monstre);
    }
  }
}

function renderGoBackHomeButton() {
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

/* le jeu */

async function renderGameState() {
  // si l'une des équipes n'a plus de monstres => fin de partie
  if (gameState.opponentTeam.length === 0 || gameState.firstPlayerTeam.length === 0) {
    endGame();
  } else {
    gameWindow();

    const perso1 = document.getElementById('monstre_player');
    const perso2 = document.getElementById('monstre_oppopnent');

    updateLifeBar(
      getPourcentageLifeLeft(gameState.opponentActiveMonster.pointsDeVie, gameState.baseLifeTeam2),
      1,
    );
    updateLifeBar(
      getPourcentageLifeLeft(gameState.activeMonsterPlayer.pointsDeVie, gameState.baseLifeTeam1),
      2,
    );
    // animation du monstre de l'équipe 1
    animePerso(perso1);
    animePerso(perso2);

    // animation du monstre de l'équipe 2

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
        let multiplicateur;

        const nom = e.currentTarget.querySelector('.nom').innerHTML;

        switch (true) {
          case gameState.opponentActiveMonster.faiblesses.includes(atkProperties.type):
            multiplicateur = 2;
            break;

          case gameState.opponentActiveMonster.resistances.includes(atkProperties.type):
            multiplicateur = 0.5;
            break;

          default:
            multiplicateur = 1;
            break;
        }
        historique.insertAdjacentHTML('afterbegin', `Vous avez joué ${nom} pour une valeur de ${nbDegats*multiplicateur} pv<br>`);
        gameState.opponentActiveMonster.pointsDeVie -= nbDegats * multiplicateur;

        updateLifeBar(
          getPourcentageLifeLeft(
            gameState.opponentActiveMonster.pointsDeVie,
            gameState.baseLifeTeam2,
          ),
          1,
        );
        changeMonsterDeath()
        clearPage();
        renderGameState();
      });
      divAttack.appendChild(atk);
      document.querySelector('.atkButtons').appendChild(divAttack);
    }
    // document.querySelector('.atkButtons').innerHTML += 'Choisissez un autre monstre à faire renter en jeu:'
    // crétaion des boutons pour permettre de changer parmis les monstres restants
    monsterButtonCreation();
    forfeitButton();
  }
}

// function to find the damage associated with the attack
function getDamage(attackName) {
  const attackDamage = gameState.attacksAndDamages.find(
    (attackAndDamage) => attackAndDamage.name === attackName,
  );
  return attackDamage;
}

function changeMonsterDeath(){
  if (gameState.opponentActiveMonster.pointsDeVie <= 0) {
    historique.insertAdjacentHTML('afterbegin', `<div class="text-danger">EQUIPE 2: Le monstre ${JSON.stringify(
      gameState.opponentActiveMonster.nom,
    )} est mort</div>`);
    const index = gameState.opponentTeam.indexOf(gameState.opponentActiveMonster);
    gameState.opponentTeam.splice(index, 1);
    gameState.baseLifeListTeam2.splice(index, 1);

    [gameState.opponentActiveMonster] = gameState.opponentTeam;

    // eslint-disable-next-line prefer-destructuring
    gameState.baseLifeTeam2 = gameState.baseLifeListTeam2[0];

    // signifie qu'il y a un monstre dans l'équipe
    if (gameState.opponentActiveMonster !== undefined) {
      gameState.baseLifeTeam2 = gameState.opponentActiveMonster.pointsDeVie;
    }
  } else {
    opponentPlay();

    updateLifeBar(
      getPourcentageLifeLeft(
        gameState.activeMonsterPlayer.pointsDeVie,
        gameState.baseLifeTeam1,
      ),
      2,
    );
    if (gameState.activeMonsterPlayer.pointsDeVie <= 0) {historique.insertAdjacentHTML('afterbegin', `<div class="text-danger">EQUIPE 1: Le monstre ${JSON.stringify(
        gameState.activeMonsterPlayer.nom,
      )} est mort</div>`);
      const index = gameState.firstPlayerTeam.indexOf(gameState.activeMonsterPlayer);
      gameState.firstPlayerTeam.splice(index, 1);
      gameState.baseLifeListTeam1.splice(index, 1);
      [gameState.activeMonsterPlayer] = gameState.firstPlayerTeam;
      // eslint-disable-next-line prefer-destructuring
      gameState.baseLifeTeam1 = gameState.baseLifeListTeam1[0];
    }
  }
}

function opponentPlay() {
  const randomAtkIndex = Math.floor(Math.random() * 4);
  let atkOrdi = gameState.opponentActiveMonster.attaques[randomAtkIndex];
  atkOrdi = getDamage(atkOrdi);
  const nbDegatsOrdi = atkOrdi.damage;
  let multiplicateur;

  switch (true) {
    case gameState.activeMonsterPlayer.faiblesses.includes(atkOrdi.type):
      multiplicateur = 2;
      break;

    case gameState.activeMonsterPlayer.resistances.includes(atkOrdi.type):
      multiplicateur = 0.5;
      break;

    default:
      multiplicateur = 1;
      break;
  }
  historique.insertAdjacentHTML('afterbegin', `<div>Votre adversaire a joué ${
    atkOrdi.name
  } pour une valeur de ${nbDegatsOrdi * multiplicateur} pv</div><br>`);
  gameState.activeMonsterPlayer.pointsDeVie -= nbDegatsOrdi * multiplicateur;
}

function updateLifeBar(pourcentage, numberPlayer) {
  const barreDeVieRemplieOpponent = document.getElementById('vieRemplieOpponent');
  const barreDeVieRempliePlayer = document.getElementById('vieRempliePlayer');

  // si le coup à été joué par l'utilisateur
  if (numberPlayer === 1) {
    barreDeVieRemplieOpponent.style.width = `${pourcentage}%`;
  } else {
    barreDeVieRempliePlayer.style.width = `${pourcentage}%`;
  }
}

function getPourcentageLifeLeft(lifeLeft, baseLife) {
  return Math.round((lifeLeft / baseLife) * 100);
}

// eslint-disable-next-line no-unused-vars
function getHtmlNbMonster(number) {
  let strHtml = '<div>';
  for (let i = 0; i < number; i += 1) {
    strHtml += `<img src="${ball}">`;
  }
  return `${strHtml}</div>`;
}

function animePerso(perso) {
  anime({
    targets: perso,
    translateY: [
      { value: '-10px', duration: 1500, easing: 'easeInOutQuad' }, // Déplacement vers le haut
      { value: '0px', duration: 1500, easing: 'easeInOutQuad' }, // Retour vers le bas
    ],
    easing: 'linear', // Utiliser 'linear' pour un mouvement fluide
    loop: true,
  });
}

export default NewPage;
