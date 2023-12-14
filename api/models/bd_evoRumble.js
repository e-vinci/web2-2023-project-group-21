const mongoose = require('mongoose');

// Définition du schéma
const evoMonsters = new mongoose.Schema({
  id: { type: Number, required: true },
  nom: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  faiblesses: { type: [String], required: true },
  resistances: { type: [String], required: true },
  pointsDeVie: { type: Number, required: true },
  attaques: { type: [String], required: true },
});

// Création du modèle
const EvoMonsters = mongoose.model('EvoMonsters', evoMonsters);

async function addEvoMonster(id, nom, type, faiblesses, resistances, pointsDeVie, attaques) {
  try {
    // Connexion à la base de données
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/?retryWrites=true&w=majority',
    );

    // Création d'un nouveau joueur avec la méthode create (qui retourne une promesse)
    const monster = await EvoMonsters.create({
      id,
      nom,
      type,
      faiblesses,
      resistances,
      pointsDeVie,
      attaques,
    });

    console.log('Monstre créé avec succès :', monster);
  } catch (err) {
    console.error('Erreur lors de la création du monstre :', err);
  } finally {
    mongoose.disconnect();
  }
}

async function getAllEvoMonsters() {
  try {
    // Recherche tous les joueurs dans la collection
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/?retryWrites=true&w=majority',
    );
    const monsters = await EvoMonsters.find();

    // Affiche les monstres
    console.log('Liste des monstres :');
    monsters.forEach((monster) => {
      console.log(
        `ID: ${monster.id}, nom: ${monster.nom}, type: ${monster.type}, faiblesses: ${monster.faiblesses}, resistances: ${monster.resistances}, pointsDeVie: ${monster.pointsDeVie}, attaques: ${monster.attaques}`,
      );
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateur :', err);
  } finally {
    mongoose.disconnect();
  }
}

addEvoMonster(1, 'Pichouli', 'feu', ['eau', 'terre'], ['feu', 'plante'], 80, [
  'Boule de feu',
  'Crocs ardents',
  'Frappe statique',
  'Explosion de flammes',
]);
getAllEvoMonsters();

module.exports = {
  addEvoMonster,
  getAllEvoMonsters,
};
