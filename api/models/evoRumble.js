/* eslint-disable no-dupe-keys */
/* eslint-disable quote-props */
const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const monstersList = [
  {
    id: 1,
    nom: 'Pichouli',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu', 'plante'],
    pointsDeVie: 80,
    attaques: ['Boule de feu', 'Crocs ardents', 'Frappe statique', 'Explosion de flammes'],
  },
  {
    id: 2,
    nom: 'Morsaking',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu', 'plante'],
    pointsDeVie: 90,
    attaques: ['Fracas sismique', 'Éclatement tellurique', 'Brasier furieux', 'Lance de feu'],
  },
  {
    id: 3,
    nom: 'Leviadrake',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu', 'plante'],
    pointsDeVie: 85,
    attaques: ['Frappe aérodynamique', 'Chaleur intense', 'Inferno', 'Explosion pyrotechnique'],
  },
  {
    id: 4,
    nom: 'Flameo',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu', 'plante'],
    pointsDeVie: 95,
    attaques: ['Boule de feu', 'Hydrocanon', 'Lacération aquatique', 'Explosion incandescente'],
  },
  {
    id: 5,
    nom: 'Blazesaur',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu', 'plante'],
    pointsDeVie: 100,
    attaques: ['Crocs ardents', 'Chaleur intense', 'Fournaise', 'Déflagration'],
  },
  {
    id: 6,
    nom: 'Diawing',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 70,
    attaques: ["Vague d'eau", 'Tornade', 'Tourbillon d\'eau', 'Rafale de plumes'],
  },
  {
    id: 7,
    nom: 'Adraqua',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 80,
    attaques: ['Coup de nageoire', 'Hydrocanon', 'Geyser', 'Éclaboussures électrifiées'],
  },
  {
    id: 8,
    nom: 'Jurazur',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 75,
    attaques: ["Jet d'eau", 'Averse', 'Muraille de pierre', 'Lacération aquatique'],
  },
  {
    id: 9,
    nom: 'Etheragli',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 85,
    attaques: ['Cascade', 'Bulles éclatantes', 'Torrent furieux', 'Inondation totale'],
  },
  {
    id: 10,
    nom: 'Carchateur',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 90,
    attaques: ["Vague d'eau", 'Champ magnétique', 'Vortex électromagnétique', 'Raz-de-marée'],
  },

  {
    id: 11,
    nom: 'Phylornis',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre', 'eau'],
    pointsDeVie: 70,
    attaques: ['Vent cinglant', 'Étreinte épineuse', 'Éruption de fleurs', 'Tempête de pétales'],
  },
  {
    id: 12,
    nom: 'Foliodragon',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre', 'eau'],
    pointsDeVie: 80,
    attaques: [
      'Liane tranchante',
      'Feuilles tranchantes',
      'Coup de nageoire',
      'Fleur empoisonnée',
    ],
  },
  {
    id: 13,
    nom: 'Chloropteryx',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre', 'eau'],
    pointsDeVie: 75,
    attaques: ['Brûlure persistante', 'Tornade florale', 'Danse des feuilles', 'Volcanique'],
  },
  {
    id: 14,
    nom: 'Biolux',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre', 'eau'],
    pointsDeVie: 85,
    attaques: ['Bombe végétale', 'Racines envahissantes', 'Vortex végétal', 'Tourbillon électrique'],
  },
  {
    id: 15,
    nom: 'Petaleon',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre', 'eau'],
    pointsDeVie: 90,
    attaques: ['Fouet végétal', 'Spirale ascendante', 'Branche foudroyante', 'Vortex végétal'],
  },

  {
    id: 16,
    nom: 'Poctali',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['vol', 'electric'],
    pointsDeVie: 70,
    attaques: ['Éclair rapide', 'Cage électrique', 'Orage dévastateur', 'Foudre en chaîne'],
  },
  {
    id: 17,
    nom: 'Nidoflash',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['vol', 'electric'],
    pointsDeVie: 80,
    attaques: ['Rayon paralysant', 'Décharge électrique', 'Écrasement de pierre', 'Charge électrisante'],
  },
  {
    id: 18,
    nom: 'Cranemeur',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['vol', 'electric'],
    pointsDeVie: 75,
    attaques: [
      'Étreinte épineuse',
      'Tempête statique',
      'Fracas sismique',
      'Vague électromagnétique',
    ],
  },
  {
    id: 19,
    nom: 'Cadalight',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['vol', 'electric'],
    pointsDeVie: 85,
    attaques: ['Électrochoc', 'Frappe aérodynamique', 'Coup de tonnerre', 'Éclat aérien'],
  },
  {
    id: 20,
    nom: 'Minjastic',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['vol', 'electric'],
    pointsDeVie: 90,
    attaques: [
      'Foudre aveuglante',
      'Tempête statique',
      'Rafale électrique',
      'Explosion électrique',
    ],
  },
  {
    id: 21,
    nom: 'Airzure',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['terre', 'plante'],
    pointsDeVie: 70,
    attaques: ['Vent cinglant', 'Plongeon rapide', 'Tempête de griffes', 'Hurlement supersonique'],
  },
  {
    id: 22,
    nom: 'Cornoiseau',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['terre', 'plante'],
    pointsDeVie: 80,
    attaques: ['Tornade', 'Attaque aérienne', 'Danse des courants', 'Spirale ascendante'],
  },
  {
    id: 23,
    nom: 'Libeoh',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['terre', 'plante'],
    pointsDeVie: 75,
    attaques: ['Éclat aérien', "Tourbillon d'ailes", 'Frappe aérodynamique', 'Rafale électrifiée'],
  },
  {
    id: 24,
    nom: 'Ectoraptor',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['terre', 'plante'],
    pointsDeVie: 85,
    attaques: ['Rafale de plumes', "Nuage d'illusion", 'Vortex de vent', 'Déferlante céleste'],
  },
  {
    id: 25,
    nom: 'Carchadrak',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['terre', 'plante'],
    pointsDeVie: 90,
    attaques: ['Vent cinglant', 'Fleur empoisonnée', 'Éclair stratosphérique', 'Vortex de vent'],
  },
  {
    id: 26,
    nom: 'Evolika',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: 'electric',
    pointsDeVie: 70,
    attaques: [
      'Secousse tellurique',
      'Jet de roches',
      'Tourbillon de gravier',
      'Éclatement tellurique',
    ],
  },
  {
    id: 27,
    nom: 'Mologround',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: 'electric',
    pointsDeVie: 80,
    attaques: ['Fracas sismique', 'Inferno', 'Fissure profonde', 'Pluie de météorites'],
  },
  {
    id: 28,
    nom: 'Soleraptor',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: 'electric',
    pointsDeVie: 75,
    attaques: ['Lance de stalactites', 'Spirale ascendante', 'Sables mouvants', 'Pilonnage géant'],
  },
  {
    id: 29,
    nom: 'Mohawk',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: 'electric',
    pointsDeVie: 85,
    attaques: ['Éclair rapide', 'Éruption rocheuse', 'attaque de pierre', 'Orage dévastateur'],
  },
  {
    id: 30,
    nom: 'Fulgureon',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: 'electric',
    pointsDeVie: 90,
    attaques: ['Secousse tellurique', 'Jet de roches', 'Magma en fusion', 'Muraille de pierre'],
  },
];
const attacksAndDamage = [
  { name: 'Brûlure persistante', damage: 20, type: 'feu' },
  { name: 'Tourbillon d\'eau', damage: 12, type: 'eau' },
  { name: 'Coup de nageoire', damage: 15, type: 'normal' },
  { name: 'Geyser', damage: 15, type: 'eau' },
  { name: 'Bourgeonnement', damage: 17, type: 'plante' },
  { name: 'Vague électromagnétique', damage: 20, type: 'electric' },
  { name: 'Sève acide', damage: 20, type: 'plante' },
  { name: 'Bombe végétale', damage: 12, type: 'plante' },
  { name: 'Racine électrique', damage: 15, type: 'electric' },
  { name: 'attaque de pierre', damage: 20, type: 'terre' },
  { name: 'Rafale électrifiée', damage: 12, type: 'electric' },
  { name: 'Éclat aérien', damage: 15, type: 'vol' },
  { name: 'Attaque aérienne', damage: 15, type: 'vol' },
  { name: 'Frappe statique', damage: 17, type: 'normal' },
  { name: 'Attaque électrique', damage: 20, type: 'electric' },
  { name: 'Muraille de pierre', damage: 20, type: 'terre' },
  { name: 'Magma en fusion', damage: 12, type: 'feu' },
  { name: 'Flammèche', damage: 15, type: 'feu' },
  { name: 'Cage électrique', damage: 15, type: 'electric' },
  { name: 'Orage dévastateur', damage: 17, type: 'electric' },
  { name: 'Foudre en chaîne', damage: 20, type: 'electric' },
  { name: 'Fleur empoisonnée', damage: 12, type: 'plante' },
  { name: 'Croissance rapide', damage: 14, type: 'plante' },
  { name: 'Feuilles tranchantes', damage: 19, type: 'plante' },
  { name: 'Rayon paralysant', damage: 13, type: 'electric' },
  { name: 'Décharge électrique', damage: 11, type: 'electric' },
  { name: 'Choc magnétique', damage: 17, type: 'electric' },
  { name: "Nuage d'illusion", damage: 11, type: 'vol' },
  { name: 'Cascade', damage: 20, type: 'eau' },
  { name: 'Torrent furieux', damage: 16, type: 'eau' },
  { name: 'Inondation totale', damage: 14, type: 'eau' },
  { name: 'Fouet végétal', damage: 11, type: 'plante' },
  { name: 'Étreinte épineuse', damage: 15, type: 'plante' },
  { name: 'Éruption de fleurs', damage: 12, type: 'plante' },
  { name: 'Tempête de pétales', damage: 19, type: 'plante' },
  { name: 'Averse', damage: 11, type: 'eau' },
  { name: 'Boule de feu', damage: 15, type: 'feu' },
  { name: 'Branche foudroyante', damage: 12, type: 'plante' },
  { name: 'Brasier furieux', damage: 19, type: 'feu' },
  { name: 'Bulles éclatantes', damage: 16, type: 'eau' },
  { name: 'Bulle protectrice', damage: 18, type: 'eau' },
  { name: 'Chaleur intense', damage: 12, type: 'feu' },
  { name: 'Charge électrisante', damage: 16, type: 'electric' },
  { name: 'Vortex électromagnétique', damage: 18, type: 'electric' },
  { name: 'Raz-de-marée', damage: 17, type: 'eau' },
  { name: 'Crocs ardents', damage: 18, type: 'feu' },
  { name: 'Coup de tonnerre', damage: 16, type: 'electric' },
  { name: 'Danse des courants', damage: 18, type: 'eau' },
  { name: 'Danse des feuilles', damage: 19, type: 'plante' },
  { name: 'Rempart minéral', damage: 15, type: 'eau' },
  { name: 'Champ magnétique', damage: 16, type: 'electric' },
  { name: 'Déflagration minérale', damage: 20, type: 'eau' },
  { name: 'Déflagration', damage: 15, type: 'feu' },
  { name: 'Déferlante céleste', damage: 17, type: 'terre' },
  { name: 'Déferlante électrique', damage: 20, type: 'electric' },
  { name: 'Éclair fulgurant', damage: 20, type: 'electric' },
  { name: 'Éclair rapide', damage: 15, type: 'electric' },
  { name: 'Éclair stratosphérique', damage: 16, type: 'vol' },
  { name: 'Éclair électrique', damage: 14, type: 'electric' },
  { name: 'Éclaboussures électrifiées', damage: 20, type: 'eau' },
  { name: 'Éclatement tellurique', damage: 18, type: 'terre' },
  { name: 'Écrasement massif', damage: 14, type: 'normal' },
  { name: 'Écrasement de pierre', damage: 14, type: 'terre' },
  { name: 'Éruption rocheuse', damage: 11, type: 'terre' },
  { name: 'Explosion de flammes', damage: 17, type: 'feu' },
  { name: 'Explosion électrique', damage: 18, type: 'electric' },
  { name: 'Explosion incandescente', damage: 18, type: 'feu' },
  { name: 'Explosion pyrotechnique', damage: 13, type: 'feu' },
  { name: 'Fissure profonde', damage: 11, type: 'terre' },
  { name: 'Flammeche', damage: 16, type: 'feu' },
  { name: 'Fournaise', damage: 14, type: 'feu' },
  { name: 'Foudre aveuglante', damage: 11, type: 'electric' },
  { name: 'Fracas sismique', damage: 13, type: 'terre' },
  { name: 'Frappe aérodynamique', damage: 14, type: 'vol' },
  { name: 'Hurlement supersonique', damage: 19, type: 'normal' },
  { name: 'Hydrocanon', damage: 17, type: 'eau' },
  { name: 'Inferno', damage: 20, type: 'feu' },
  { name: "Jet d'eau", damage: 12, type: 'eau' },
  { name: 'Jet de roches', damage: 12, type: 'terre' },
  { name: 'Lacération aquatique', damage: 14, type: 'eau' },
  { name: "Lame d'eau", damage: 19, type: 'eau' },
  { name: 'Lance de stalactites', damage: 13, type: 'eau' },
  { name: 'Lance de feu', damage: 13, type: 'feu' },
  { name: 'Liane tranchante', damage: 18, type: 'plante' },
  { name: 'Plongeon rapide', damage: 19, type: 'vol' },
  { name: 'Pilonnage géant', damage: 16, type: 'terre' },
  { name: 'Pluie de météorites', damage: 12, type: 'feu' },
  { name: 'Rafale électrique', damage: 11, type: 'electric' },
  { name: 'Rafale de feuille', damage: 15, type: 'plante' },
  { name: 'Rafale de plumes', damage: 15, type: 'vol' },
  { name: 'Racines envahissantes', damage: 20, type: 'plante' },
  { name: 'Secousse tellurique', damage: 17, type: 'terre' },
  { name: 'Sables mouvants', damage: 15, type: 'terre' },
  { name: 'Spirale ascendante', damage: 12, type: 'vol' },
  { name: 'Tempête de griffes', damage: 17, type: 'normal' },
  { name: 'Tempête statique', damage: 13, type: 'vol' },
  { name: 'Tornade florale', damage: 16, type: 'plante' },
  { name: 'Tornade', damage: 13, type: 'vol' },
  { name: 'Tourbillon de gravier', damage: 17, type: 'terre' },
  { name: "Tourbillon d'ailes", damage: 16, type: 'vol' },
  { name: 'Tourbillon électrique', damage: 14, type: 'electric' },
  { name: "Vague d'eau", damage: 13, type: 'eau' },
  { name: 'Vent cinglant', damage: 16, type: 'vol' },
  { name: 'Volcanique', damage: 16, type: 'feu' },
  { name: 'Vortex de vent', damage: 13, type: 'vol' },
  { name: 'Vortex végétal', damage: 14, type: 'plante' },
  { name: 'Électrochoc', damage: 13, type: 'electric' },
];

function getAllMonsters() {
  const monsters = parse(jsonDbPath, monstersList);
  return monsters;
}

function getAllAttacks() {
  const attacks = parse(jsonDbPath, attacksAndDamage);
  return attacks;
}

function getMonstersByType(type) {
  const monsters = parse(jsonDbPath, monstersList);
  const monstersWithType = monsters.filter((monster) => monster.type === type);
  return monstersWithType;
}

module.exports = {
  getAllMonsters,
  getMonstersByType,
  getAllAttacks,
};
