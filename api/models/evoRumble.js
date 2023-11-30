const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const monstersList = [
  {
    id: 1,
    image: 'fire_monster1.png',
    nom: 'FeuMonstre1',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu'],
    pointsDeVie: 80,
    attaques: ['Boule de feu', 'Crocs ardents', 'Volcanique', 'Explosion de flammes'],
  },
  {
    id: 2,
    image: 'fire_monster2.png',
    nom: 'FeuMonstre2',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu'],
    pointsDeVie: 90,
    attaques: ['Chaleur intense', 'Boule de feu', 'Brasier furieux', 'Lance de feu'],
  },
  {
    id: 3,
    image: 'fire_monster3.png',
    nom: 'FeuMonstre3',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu'],
    pointsDeVie: 85,
    attaques: ['Flammèche', 'Chaleur intense', 'Inferno', 'Explosion pyrotechnique'],
  },
  {
    id: 4,
    image: 'fire_monster4.png',
    nom: 'FeuMonstre4',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu'],
    pointsDeVie: 95,
    attaques: ['Boule de feu', 'Flammèche', 'Brûlure persistante', 'Explosion incandescente'],
  },
  {
    id: 5,
    image: 'fire_monster5.png',
    nom: 'FeuMonstre5',
    type: 'feu',
    faiblesses: ['eau', 'terre'],
    resistances: ['feu'],
    pointsDeVie: 100,
    attaques: ['Crocs ardents', 'Chaleur intense', 'Fournaise', 'Déflagration'],
  },
  {
    id: 6,
    image: 'water_monster6.png',
    nom: 'EauMonstre1',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 70,
    attaques: ["Vague d'eau", 'Tornade', 'Tourbillon électrique', "Lame d'eau"],
  },
  {
    id: 7,
    image: 'water_monster7.png',
    nom: 'EauMonstre2',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 80,
    attaques: ['Coup de nageoire', 'Hydrocanon', 'Geyser', 'Éclaboussures électrifiées'],
  },
  {
    id: 8,
    image: 'water_monster8.png',
    nom: 'EauMonstre3',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 75,
    attaques: ["Jet d'eau", 'Averse', 'Bulle protectrice', 'Lacération aquatique'],
  },
  {
    id: 9,
    image: 'water_monster9.png',
    nom: 'EauMonstre4',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 85,
    attaques: ['Cascade', 'Bulles éclatantes', 'Torrent furieux', 'Inondation totale'],
  },
  {
    id: 10,
    image: 'water_monster10.png',
    nom: 'EauMonstre5',
    type: 'eau',
    faiblesses: ['electric', 'plante'],
    resistances: ['feu', 'eau'],
    pointsDeVie: 90,
    attaques: ["Vague d'eau", 'Averse', 'Vortex électromagnétique', 'Raz-de-marée'],
  },

  {
    id: 11,
    image: 'plant_monster11.png',
    nom: 'PlanteMonstre1',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre'],
    pointsDeVie: 70,
    attaques: ['Fouet végétal', 'Étreinte épineuse', 'Éruption de fleurs', 'Tempête de pétales'],
  },
  {
    id: 12,
    image: 'plant_monster12.png',
    nom: 'PlanteMonstre2',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre'],
    pointsDeVie: 80,
    attaques: [
      'Liane tranchante',
      'Feuilles tranchantes',
      'Croissance rapide',
      'Fleur empoisonnée',
    ],
  },
  {
    id: 13,
    image: 'plant_monster13.png',
    nom: 'PlanteMonstre3',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre'],
    pointsDeVie: 75,
    attaques: ['Bourgeonnement', 'Tornade florale', 'Danse des feuilles', 'Racine électrique'],
  },
  {
    id: 14,
    image: 'plant_monster14.png',
    nom: 'PlanteMonstre4',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre'],
    pointsDeVie: 85,
    attaques: ['Bombe végétale', 'Racines envahissantes', 'Vortex végétal', 'Sève régénératrice'],
  },
  {
    id: 15,
    image: 'plant_monster15.png',
    nom: 'PlanteMonstre5',
    type: 'plante',
    faiblesses: ['feu', 'vol'],
    resistances: ['plante', 'electric', 'terre'],
    pointsDeVie: 90,
    attaques: ['Fouet végétal', 'Étreinte épineuse', 'Branche foudroyante', 'Vortex végétal'],
  },

  {
    id: 16,
    image: 'electric_monster16.png',
    nom: 'ElectriqueMonstre1',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['eau', 'electric'],
    pointsDeVie: 70,
    attaques: ['Éclair rapide', 'Cage électrique', 'Orage dévastateur', 'Foudre en chaîne'],
  },
  {
    id: 17,
    image: 'electric_monster17.png',
    nom: 'ElectriqueMonstre2',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['eau', 'electric'],
    pointsDeVie: 80,
    attaques: ['Rayon paralysant', 'Décharge électrique', 'Choc magnétique', 'Charge électrisante'],
  },
  {
    id: 18,
    image: 'electric_monster18.png',
    nom: 'ElectriqueMonstre3',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['eau', 'electric'],
    pointsDeVie: 75,
    attaques: [
      'Foudre aveuglante',
      'Tempête statique',
      'Éclair fulgurant',
      'Vague électromagnétique',
    ],
  },
  {
    id: 19,
    image: 'electric_monster19.png',
    nom: 'ElectriqueMonstre4',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['eau', 'electric'],
    pointsDeVie: 85,
    attaques: ['Électrochoc', 'Bouclier électrique', 'Coup de tonnerre', 'Frappe statique'],
  },
  {
    id: 20,
    image: 'electric_monster20.png',
    nom: 'ElectriqueMonstre5',
    type: 'electric',
    faiblesses: ['terre'],
    resistances: ['eau', 'electric'],
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
    image: 'flying_monster21.png',
    nom: 'VolMonstre1',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['vol', 'plante'],
    pointsDeVie: 70,
    attaques: ['Vent cinglant', 'Plongeon rapide', 'Tempête de griffes', 'Hurlement supersonique'],
  },
  {
    id: 22,
    image: 'flying_monster22.png',
    nom: 'VolMonstre2',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['vol', 'plante'],
    pointsDeVie: 80,
    attaques: ['Tornade', 'Attaque aérienne', 'Danse des courants', 'Spirale ascendante'],
  },
  {
    id: 23,
    image: 'flying_monster23.png',
    nom: 'VolMonstre3',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['vol', 'plante'],
    pointsDeVie: 75,
    attaques: ['Éclat aérien', "Tourbillon d'ailes", 'Frappe aérodynamique', 'Rafale électrifiée'],
  },
  {
    id: 24,
    image: 'flying_monster24.png',
    nom: 'VolMonstre4',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['vol', 'plante'],
    pointsDeVie: 85,
    attaques: ['Rafale de plumes', "Nuage d'illusion", 'Vortex de vent', 'Déferlante céleste'],
  },
  {
    id: 25,
    image: 'flying_monster25.png',
    nom: 'VolMonstre5',
    type: 'vol',
    faiblesses: ['electric'],
    resistances: ['vol', 'plante'],
    pointsDeVie: 90,
    attaques: ['Vent cinglant', 'Plongeon rapide', 'Éclair stratosphérique', 'Vortex de vent'],
  },
  {
    id: 26,
    image: 'earth_monster26.png',
    nom: 'TerreMonstre1',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: ['terre', 'feu', 'electric'],
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
    image: 'earth_monster27.png',
    nom: 'TerreMonstre2',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: ['terre', 'feu', 'electric'],
    pointsDeVie: 80,
    attaques: ['Fracas sismique', 'Bouclier de pierre', 'Fissure profonde', 'Pluie de météorites'],
  },
  {
    id: 28,
    image: 'earth_monster28.png',
    nom: 'TerreMonstre3',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: ['terre', 'feu', 'electric'],
    pointsDeVie: 75,
    attaques: ['Lance de stalactites', 'Écrasement massif', 'Sables mouvants', 'Pilonnage géant'],
  },
  {
    id: 29,
    image: 'earth_monster29.png',
    nom: 'TerreMonstre4',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: ['terre', 'feu', 'electric'],
    pointsDeVie: 85,
    attaques: ['Rempart minéral', 'Éruption rocheuse', 'Champ magnétique', 'Déflagration minérale'],
  },
  {
    id: 30,
    image: 'earth_monster30.png',
    nom: 'TerreMonstre5',
    type: 'terre',
    faiblesses: ['eau', 'plante'],
    resistances: ['terre', 'feu', 'electric'],
    pointsDeVie: 90,
    attaques: ['Secousse tellurique', 'Jet de roches', 'Magma en fusion', 'Muraille de pierre'],
  },
];

function getAllMonsters() {
  const monsters = parse(jsonDbPath, monstersList);
  return monsters;
}

function getMonstersByType(type) {
  const monsters = parse(jsonDbPath, monstersList);
  const monstersWithType = monsters.filter((monster) => monster.type === type);
  return monstersWithType;
}

module.exports = {
  getAllMonsters,
  getMonstersByType,
};