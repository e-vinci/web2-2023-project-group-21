import imgAvatar from '../../img/exemple_avatar.png';
import aaronSprite from '../../img/aaronSprite.png';
import traineers from '../../img/traineers.png';
import { getAuthenticatedUser,  isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';

const main = document.querySelector('main');
let imgAvatarCurrently = imgAvatar;
const leaderboard = await getLeaderboard();

let  userScore;
const ProfilPage = async () =>{
    const authUser =  getAuthenticatedUser();
    if (authUser !== undefined) {
        userScore =  await getUserScore(authUser);
        renderProfil(authUser); 
      } else {
        Navigate('/login');
      }
}

async function getLeaderboard() {
  try {
    const response = await fetch('/api/score/leaderboard');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('getLeaderboard::error: ', err);
    throw err;
  }
}

async function getUserScore(authUser) {
    if(isAuthenticated){
        try {
            const response = await fetch(
              `/api/score/getScore?username=${encodeURIComponent(authUser?.username)}`,
            );
            if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        
            const data = await response.json();
            return data;
          } catch (err) {
            console.error('getLeaderboard::error: ', err);
            throw err;
          }
    }
    return null;
}

async function renderProfil(authUser) {
  main.innerHTML = `<div id="divPrincipal" class="container mt-5">
                        <div class="card text-center mx-auto" style="width: 18rem;">
                            <img id="imgProfil" class="card-img-top h-200 w-100" src="${imgAvatarCurrently}" alt="Card image cap">
                            <div class="card-body">
                                <p class="card-text" id="pseudo"></p>
                                <p class="card-text" id="score"></p>
                                <p class="card-text" id="rank"></p>
                            </div>
                        </div>
                    </div>`;

  const submit = document.createElement('button');
  submit.className = 'rounded';
  submit.innerText = 'Modifier son avatar';
  submit.addEventListener('click', () => {
    submit.remove();
    selectAvatar();
  });
  main.querySelector('.card-body').appendChild(submit);
  const pseudo = main.querySelector('#pseudo');
  const score = main.querySelector('#score');
  const rank = main.querySelector('#rank');

  pseudo.innerText = authUser?.username;
  score.innerText = `Score : ${userScore} points`;
  rank.innerText = `Rank : #${leaderboard.findIndex(
    (user) => user.username === authUser?.username,
  ) + 1}`;
}

let selectedAvatarSource = null;

function selectAvatar() {
  const divPrincipal = document.getElementById('divPrincipal');
  const formAvatar = document.createElement('form');

  const tableauDAvatar = document.createElement('div');
  tableauDAvatar.className = 'container d-flex justify-content-center my-5';

  tableauDAvatar.addEventListener('click', handleAvatarClick);

  const createAvatarDiv = (imgSrc) => {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar-container'; // Ajoutez une classe pour le style

    const avatarImg = document.createElement('img');
    avatarImg.src = imgSrc;
    avatarImg.id = 'imgAvatar';
    avatarImg.setAttribute('data-src', imgSrc);

    avatarDiv.appendChild(avatarImg);
    tableauDAvatar.appendChild(avatarDiv);
  };

  createAvatarDiv(aaronSprite);
  createAvatarDiv(imgAvatar);
  createAvatarDiv(traineers);

  const submit = document.createElement('button');
  submit.innerText = 'Valider';
  submit.addEventListener('click', handleValidation);

  const submitDiv = document.createElement('div');
  submitDiv.className = 'mx-auto d-flex justify-content-center';
  submitDiv.appendChild(submit);

  const tableauDAvatarDiv = document.createElement('div');
  tableauDAvatarDiv.appendChild(tableauDAvatar);

  formAvatar.appendChild(tableauDAvatarDiv);
  formAvatar.appendChild(submitDiv);

  divPrincipal.appendChild(formAvatar);
}

function handleAvatarClick(event) {
  if (event.target.tagName === 'IMG') {
    // Réinitialisez la bordure pour toutes les images
    const allAvatarImages = document.querySelectorAll('.avatar-container img');
    // eslint-disable-next-line no-return-assign, no-param-reassign
    allAvatarImages.forEach((img) => (img.style.border = 'none'));

    // Mettez à jour la source de l'image sélectionnée
    selectedAvatarSource = event.target.getAttribute('data-src');

    // Ajoutez une bordure à l'image sélectionnée
    // eslint-disable-next-line no-param-reassign
    event.target.style.border = '2px solid blue';
  }
}

function handleValidation() {
  if (selectedAvatarSource) {
    imgAvatarCurrently = selectedAvatarSource;
    ProfilPage();
  }
}

export default ProfilPage;
