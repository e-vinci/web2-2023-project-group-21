import Navigate from '../Router/Navigate';

const main = document.querySelector('main');

const Register = () => {
  main.innerHTML = `<section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">S'inscrire</h2>
                <p class="text-white-50 mb-5">Choisissez un pseudo et un mot de passe !</p>

                <form id="registerform" >
  
                <div class="form-outline form-white mb-4">
                  <input type="text" id="registerUsername" class="form-control form-control-lg" placeholder="Pseudo" />
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input type="password" id="registerPassword" class="form-control form-control-lg" placeholder="Mot de passe"" />
                </div>

                <div class="form-outline form-white mb-4">
                <input type="password" id="registerCPassword" class="form-control form-control-lg" placeholder="Confirmer mot de passe"" />
                </div>

                <button class="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
  const formRegister = document.querySelector('form');
  formRegister.addEventListener('submit', addUsers);
};
async function addUsers(e) {
  e.preventDefault();
  const username = document.querySelector('#registerUsername').value;
  const password = document.querySelector('#registerPassword').value;
  const passwordC = document.querySelector('#registerCPassword').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password, passwordC }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`/api/auths/register`, options);

  if (!response.ok) {
    main.innerHTML = `<section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">S'inscrire</h2>
                <p class="text-white-50 mb-5">Choisissez un pseudo et un mot de passe !</p>

                <form id="registerform" >
  
                <div class="form-outline form-white mb-4">
                  <input type="text" id="registerUsername" class="form-control form-control-lg" placeholder="Pseudo" />
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input type="password" id="registerPassword" class="form-control form-control-lg" placeholder="Mot de passe"" />
                </div>

                <div class="form-outline form-white mb-4">
                <input type="password" id="registerCPassword" class="form-control form-control-lg" placeholder="Confirmer mot de passe"" />
              </div>
  
                <button class="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                <br></br>
                

                <div class="alert alert-danger text-danger" role="alert">
                Error in the registration
              </div>
                
            </form>
              </div
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
    throw new Error(`Petit Soucis : ${response.status} : ${response.statusText}`);
  }
  Navigate('/login');
}

export default Register;
