const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create model
const UsersModel = mongoose.model('Users', UserSchema);

async function addUser(username, password) {
  // Connection to the database
  try {
    await mongoose
      .connect(
        'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/evorumble?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));

    await UsersModel.create({
      username,
      password,
    }).then((user) => console.log('Creation user succesfull :', user));

    // Disconnect of the database
  } catch (err) {
    console.error('Erreur lors de la création du joueur :', err);
  } finally {
    // Assurez-vous de déconnecter la base de données lorsque vous avez terminé
    mongoose.disconnect();
  }
  return true;
}

async function showAllUsers() {
  try {
    // Search all users in the database
    await mongoose.connect(
      'mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/?retryWrites=true&w=majority',
    );
    const getUsers = await users.find();

    // Show all users
    console.log('List of user :');
    getUsers.forEach((user) => {
      console.log(
        `ID: ${user.id}, link_avatar: ${user.link_avatar}, username: ${user.username}, password: ${user.password}`,
      );
    });
  } catch (err) {
    console.error('Error retrieving users:', err);
  } finally {
    mongoose.disconnect();
  }
}

async function showAllUsernames() {
  const usernamesTable = [];
  try {
    const getUsers = await users.find();

    getUsers.forEach((user) => {
      console.log(user.pseudo);
      usernamesTable.push(user.pseudo);
    });
  } catch (erreur) {
    console.error('Error retrieving userss :', erreur);
  }
  return usernamesTable;
}

module.exports = {
  showAllUsers,
  addUser,
  showAllUsernames,
};
