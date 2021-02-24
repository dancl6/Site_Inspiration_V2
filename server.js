const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const passport = require('./utils/passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


require('dotenv').config();

const path = require('path');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3002;


let cookieVar;
// set up for running on heroku
if(process.env.JAWSDB_URL) {
  cookieVar = process.env.JAWSDB_COOKIE;
} else {
  cookieVar = process.env.DB_COOKIE;
}

const sess = {
  secret: cookieVar,
  cookie: {
    maxAge: (1000 * 60 * 60)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));
// initialize passport, use passport session
// app.use(passport.initialize());
// app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.get('/', (req, res) => res.send('INDEX'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
const db = require("./models");
const Role = db.role;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});