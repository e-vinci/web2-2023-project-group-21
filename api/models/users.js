const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

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

async function login(username, password) {
  const userFound = await readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = await readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);
  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function readOneUserFromUsername(username) {
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
    if (getUser !== undefined) {
      return getUser[0];
    }
  } catch (err) {
    console.error('Error retrieving users:', err);
  } finally {
    mongoose.disconnect();
  }
  return undefined;
}

async function createOneUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
      password: hashedPassword,
    }).then((user) => console.log('Creation user succesfull :', user));

    // Disconnect of the database
  } catch (err) {
    console.error('Erreur lors de la création du joueur :', err);
  } finally {
    // Assurez-vous de déconnecter la base de données lorsque vous avez terminé
    mongoose.disconnect();
  }
}

module.exports = {
  login,
  register,
};
