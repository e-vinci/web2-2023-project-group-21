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

const attacks = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  damage: { type: Number, required: true },
  type: { type: String, required: true },
});

// Création du modèle
const EvoMonsters = mongoose.model('EvoMonsters', evoMonsters);
const Attacks = mongoose.model('Attacks', attacks);

async function addEvoMonster(id, nom, type, faiblesses, resistances, pointsDeVie, attaques) {
  try {
    // Connexion à la base de données
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
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

async function addAttack(name, damage, type) {
  try {
    // Connexion à la base de données
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    // Création d'un nouveau joueur avec la méthode create (qui retourne une promesse)
    const attack = await Attacks.create({
      name,
      damage,
      type,
    });

    console.log('Attaque créé avec succès :', attack);
  } catch (err) {
    console.error("Erreur lors de la création de l'attaque :", err);
  } finally {
    mongoose.disconnect();
  }
}

async function getAllEvoMonsters() {
  try {
    // Recherche tous les joueurs dans la collection
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    const monsters = await EvoMonsters.find();

    // Affiche les monstres
    console.log('Liste des monstres :');
    monsters.forEach((monster) => {
      console.log(
        `ID: ${monster.id}, nom: ${monster.nom}, type: ${monster.type}, faiblesses: ${monster.faiblesses}, resistances: ${monster.resistances}, pointsDeVie: ${monster.pointsDeVie}, attaques: ${monster.attaques}`,
      );
    });
    return monsters;
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateur :', err);
    return undefined;
  } finally {
    mongoose.disconnect();
  }
}

async function getAllAttacks() {
  try {
    // Recherche tous les joueurs dans la collection
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    const allAttacks = await Attacks.find();

    // Affiche les monstres
    console.log('Liste des monstres :');
    allAttacks.forEach((attack) => {
      console.log(
        `Name: ${attack.name}, damage: ${attack.damage}, type: ${attack.type}`,
      );
    });
    return allAttacks;
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateur :', err);
    return undefined;
  } finally {
    mongoose.disconnect();
  }
}

module.exports = {
  addEvoMonster,
  getAllEvoMonsters,
  addAttack,
  getAllAttacks,
};
