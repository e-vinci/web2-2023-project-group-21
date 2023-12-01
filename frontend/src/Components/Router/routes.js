import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import EvoRumblePage from '../Pages/EvoRumblePage';
import ProfilPage from '../Pages/ProfilPage';
import RulePage from '../Pages/RulesPage';
import GameModePage from '../Pages/GameModePage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/evoRumble': EvoRumblePage,
  '/profil': ProfilPage,
  '/rule': RulePage,
  '/gameMode' : GameModePage,
};

export default routes;
