// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { isAuthenticated, getAuthenticatedUser} from '../../utils/auths';
// import logo from '../../img/LogoJS.png';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
 const authenticatedUser = getAuthenticatedUser();
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const anonymousUserNavbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid row justify-content-end">
        <div class="row" id="navbarSupportedContent">
          <div class="nav-item col-4 d-flex" id="divGauche">
            <div class="nav-item p-2">
              <a class="nav-link" href="#" data-uri="/rule">Game Rule</a>
            </div>
          </div>
          <div class="nav-item col-4 d-flex justify-content-center" id="divCentre">
            <div id="divLogo" class="nav-item p-2">
              <a class="nav-link d-flex" href="#" data-uri="/">
              evorumble logo
              </a> 
            </div>
          </div>
          <div class="nav-item col-4 d-flex justify-content-end" id="divDroite">
            <div class="nav-item p-2">
              <a class="nav-link" href="#" data-uri="/login">Se Connecter</a>
            </div> 
            <div class="nav-item p-2">
              <a class="nav-link" href="#" data-uri="/register">S'Enregistrer</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;

  const authenticatedUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid row justify-content-end">
      <div class="row" id="navbarSupportedContent">
        <div class="nav-item col-4 d-flex" id="divGauche">
          <div class="nav-item p-2">
            <a class="nav-link" href="#" data-uri="/rule">Game Rule</a>
          </div>
        </div>
        <div class="nav-item col-4 d-flex justify-content-center" id="divCentre">
          <div id="divLogo" class="nav-item p-2">
            <a class="nav-link" href="#" data-uri="/">
            evorumble logo
            </a> 
          </div>
        </div>
        <div class="nav-item col-4 d-flex justify-content-end" id="divDroite">
          <div class="nav-item p-2">
            <a class="nav-link" href="#" data-uri="/profil">Profil de ${authenticatedUser?.username}</a>
          </div>
          <div class="nav-item p-2">
          <a class="nav-link" href="#" data-uri="/logout">Logout</a>
        </div>
        </div>
      </div>
    </div>
  </nav>
`;
navbarWrapper.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar; 
};

export default Navbar;
