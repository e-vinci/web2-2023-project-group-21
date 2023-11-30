const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const leaderboard = [
    {
        pseudo: 'joueur',
        score: 0,
    },
    {
        pseudo: 'joueur2',
        score: 990,
    },
    {
        pseudo: 'joueur3',
        score: 200,
    },
    {
        pseudo: 'joueur4',
        score: 510,
    },
    {
        pseudo: 'joueur5',
        score: 99990,
    },
    {
        pseudo: 'joueur6',
        score: 1560,
    },
    {
        pseudo: 'joueur7',
        score: 79850,
    },
    {
        pseudo: 'joueur8',
        score: 3642,
    },
    {
        pseudo: 'joueur9',
        score: 3698,
    },
    {
        pseudo: 'joueur10',
        score: 14529,
    },
    {
        pseudo: 'joueur11',
        score: 6542,
    },
    {
        pseudo: 'joueur12',
        score: 98122,
    },
    {
        pseudo: 'joueur13',
        score: 13474,
    },
];

function readLeaderboard() {
  return leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
};

module.exports = {
    readLeaderboard,
};
