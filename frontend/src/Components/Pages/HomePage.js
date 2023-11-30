
import Navigate from '../Router/Navigate';

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container mt-5 pt-5">
    <div class="row content">
      <div class="col-md-4 text-center">
        <div class="d-inline-block">
          <div class="border p-5 pt-2 pb-0">
            <p>TOP 10</p>
          </div>
          <div class="border p-5 pt-2 pb-0">
            <ol>
              <li>Joueur 1- Score </li>
              <li>Joueur 2- Score </li>
              <li>Joueur 3- Score </li>
              <li>Joueur 4- Score </li>
              <li>Joueur 5- Score </li>
              <li>Joueur 6- Score </li>
              <li>Joueur 7- Score </li>
              <li>Joueur 8- Score</li>
              <li>Joueur 9- Score </li>
              <li>Joueur 10- Score </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="col-md-4 align-self-center text-center">
        <div>
          <h1>EvoRumble</h1>
          <button  id="GameButton"></button>
        </div>
      </div>
    </div>
  </div>`;

  const submit = document.querySelector('#GameButton');
  submit.innerHTML = 'JOUER';
  submit.className = 'btn btn-primary btn-lg rounded-pill';
  submit.addEventListener('click', () => {
      Navigate('/evoRumble');
  });
};

export default HomePage;
