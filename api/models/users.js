const mongoose = require('mongoose');

// Define schemùa
const usernameSchema = new mongoose.Schema({
  link_avatar: { type: String, required: false },
  pseudo: { type: String, unique: true, required: true },
  mdp: { type: String, required: true },
});

// Create model
const User = mongoose.model('User', usernameSchema);

async function addUser(username, password) {
  try {
    // Connection to the database
    await mongoose.connect('mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/?retryWrites=true&w=majority', {
    });

    // Creation  of new users with the create method
    const user = await User.create({
      username,
      password,
    });

    console.log('Creation user succesfull :', user);
    // You can add other methods here
  } catch (err) {
    console.error('Error in the user creationr :', err);
  } finally {
    // Disconnect of the database
    mongoose.disconnect();
  }
  return true;
}

async function showAllUsers() {
  try {
    // Search all users in the database
    await mongoose.connect('mongodb+srv://ProjetEvo:Vinci2023@projetweb.u3w9kax.mongodb.net/?retryWrites=true&w=majority');
    const users = await User.find();

    // Show all users
    console.log('List of user :');
    users.forEach((user) => {
      console.log(`ID: ${user.id}, link_avatar: ${user.link_avatar}, username: ${user.username}, password: ${user.password}`);
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
    const users = await User.find();

    users.forEach((user) => {
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
