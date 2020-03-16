const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const passport = require('passport');
const registerRoutes = require('./routes/auth/register');
const loginRoutes = require('./routes/auth/login');
const userRoutes = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.json());
app.use(cors());

app.use('/login', loginRoutes);
app.use('/signup', registerRoutes);
app.use('/users', userRoutes);

async function start() {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
