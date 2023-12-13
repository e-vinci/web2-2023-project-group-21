import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import EvoRumblePage from '../Pages/EvoRumblePage';
import ProfilPage from '../Pages/ProfilPage';
import RulePage from '../Pages/RulesPage';
import GameModePage from '../Pages/GameModePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/evoRumble': EvoRumblePage,
  '/profil': ProfilPage,
  '/rule': RulePage,
  '/gameMode' : GameModePage,
  '/login' : LoginPage,
  '/register' : RegisterPage,
  '/logout': Logout,};

export default routes;
