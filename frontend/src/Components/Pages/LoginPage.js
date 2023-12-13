import Navigate from "../Router/Navigate";

const STORE_NAME = 'user';

const setUserSessionData = (user) => {
  const storageValue = JSON.stringify(user);
  localStorage.setItem(STORE_NAME, storageValue);
};

const main = document.querySelector('main');


const Login = () => {
    main.innerHTML = `<section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Entrez votre pseudo et votre mot de passe !</p>
                
                <form id="connectForm">

                <div class="form-outline form-white mb-4">
                  <input type="text" id="connectUsername" class="form-control form-control-lg" placeholder="Pseudo" />
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input type="password" id="connectPassword" class="form-control form-control-lg" placeholder="Mot de passe"" />
                </div>
  
                <button class="btn btn-outline-light btn-lg px-5" type="submit" id="submit">Login</button>
                
                </form>
              </div>
              <div>
                <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  

//   const password = document.getElementById("connectPassword");
  const form = document.querySelector('#connectForm');
  form.addEventListener("submit", getUser)
}
  async function getUser (e){
    e.preventDefault();
    const username = document.querySelector('#connectUsername').value;
    const password = document.querySelector('#connectPassword').value;
    
     console.log(`skch ${  JSON.stringify(username)}`);
     const url = `/api/users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

     const options = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      },
     };
     
    const reponse = await fetch(url, options);
  
    if (!reponse.ok) {
      main.innerHTML = `<section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Entrez votre pseudo et votre mot de passe !</p>
                
                <form id="connectForm">

                <div class="form-outline form-white mb-4">
                  <input type="text" id="connectUserName" class="form-control form-control-lg" placeholder="Pseudo" />
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input type="password" id="connectPassword" class="form-control form-control-lg" placeholder="Mot de passe"" />
                </div>
  
                <button class="btn btn-outline-light btn-lg px-5" type="submit" id="submit">Login</button>
                
                </form>
              </div>
              <div>
                <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
              <div class="alert alert-danger text-danger" role="alert">
                  Error in the connection
                </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
    throw new Error(`Petit Soucis : ${reponse.status } : ${reponse.statusText}`)
  };
  setUserSessionData(username);
  Navigate('/')
};
  
  
  export default Login;