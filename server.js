// require packages
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// require modules
const controllers = require('./controllers');
const sequelize = require('./config/connection');

// server set up
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
