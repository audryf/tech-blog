// load dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

//initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// require modules
const controllers = require('./controllers');
const sequelize = require('./config/connection');

// server set up
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    })
  })
)
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
