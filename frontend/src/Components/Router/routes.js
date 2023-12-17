import HomePage from '../Pages/HomePage';
import EvoRumblePage from '../Pages/EvoRumblePage';
import ProfilPage from '../Pages/ProfilPage';
import RulePage from '../Pages/RulesPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/evoRumble': EvoRumblePage,
  '/profil': ProfilPage,
  '/rule': RulePage,
  '/login' : LoginPage,
  '/register' : RegisterPage,
  '/logout': Logout,};

export default routes;
