import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import EvoRumblePage from '../Pages/EvoRumblePage';
import ProfilPage from '../Pages/Profil';
import RulePage from '../Pages/RulesPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/evoRumble': EvoRumblePage,
  '/profil': ProfilPage,
  '/rule': RulePage,
};

export default routes;
