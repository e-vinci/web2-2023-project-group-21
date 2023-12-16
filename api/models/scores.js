const mongoose = require('mongoose');
const { UsersModel } = require('./users');

async function getScore(username) {
  try {
    // Search all users in the database
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    const getUser = await UsersModel.find({ username });
    console.log(`${getUser[0].score}oue`);
    if (getUser !== undefined) {
      return getUser[0].score;
    }
  } catch (err) {
    console.error('Error retrieving users:', err);
  } finally {
    mongoose.disconnect();
  }
  return undefined;
}

async function updateScore(username, score) {
  try {
    // Search all users in the database
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    await UsersModel.updateOne({ username }, { $set: { score } });
    return true;
  } catch (err) {
    console.error('Error retrieving users:', err);
  } finally {
    mongoose.disconnect();
  }
  return undefined;
}

async function getLeaderboard() {
  try {
    // Search all users in the database
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    const leaderboard = await UsersModel.find();
    const leaderboardReturn = [];
    leaderboard.forEach((eachUser) => {
      const user = {
        username: eachUser.username,
        score: eachUser.score,
      };
      leaderboardReturn.push(user);
    });
    return leaderboardReturn.sort((a, b) => b.score - a.score).slice(0, 10);
  } catch (err) {
    console.error('Error retrieving users:', err);
  } finally {
    mongoose.disconnect();
  }
  return undefined;
}

module.exports = {
  getScore,
  updateScore,
  getLeaderboard,
};
