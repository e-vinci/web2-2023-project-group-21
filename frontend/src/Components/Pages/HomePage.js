import Navigate from '../Router/Navigate';

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

const HomePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container mt-5 pt-5">
    <div class="row content">
      <div class="col-md-4">
        <div class="d-inline-block">
          <div class="border p-5 pt-2 pb-0 text-center">
            <p>TOP 10</p>
          </div>
          <div class="border p-5 pt-2 pb-0">
            <ol id="leaderboard">
            </ol>
          </div>
        </div>
      </div>
      <div class="col-md-4 align-self-center text-center">
        <div>
          <h1>EvoRumble</h1>
          <button id="GameButton"></button>
        </div>
      </div>
    </div>
  </div>`;

  try {
    const leaderboard = await getLeaderboard();
    const leaderboardHTML = document.querySelector('#leaderboard');
    leaderboardHTML.innerHTML = ''; // Clear existing content
    leaderboard.forEach((player) => {
      leaderboardHTML.innerHTML += `<li> ${player.username} - ${player.score} points</li>`;
    });

  } catch (error) {
    console.error('HomePage::error: ', error);
    // Handle error as needed
  }
  
  const submit = document.querySelector('#GameButton');
  submit.innerHTML = 'JOUER';
  submit.className = 'btn btn-primary btn-lg rounded-pill';
  submit.addEventListener('click', () => {
    Navigate('/evoRumble');
  });
};

export default HomePage;
