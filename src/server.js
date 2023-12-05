const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');
const Keycloak = require('keycloak-connect');

/* handy variables */
const app = express();
const PORT = process.env.PORT || 3000;
const sessionStore = new session.MemoryStore();

/* handy objects */
const sessionInit = {
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
};

const keycloak = new Keycloak({
  store: sessionStore
});

/* session config */
app.use(session(sessionInit));

/* ejs, express ejs layouts and static files config */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressEjsLayouts);
app.use(express.static(__dirname + '/static'));

/* keycloak config */
app.use(keycloak.middleware({
  logout: '/logout'
}));

/* config */
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* routers */
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const faqRouter = require('./routes/faq');
const accountRouter = require('./routes/account');
const tasksRouter = require('./routes/tasks');
const apiRouter = require('./routes/api');

/* app routes */
app.use('/', homeRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/tasks', keycloak.protect(), tasksRouter);
app.use('/account', keycloak.protect(), accountRouter);

/* api */
app.use('/api', apiRouter);

/* app listens on PORT */
app.listen(PORT, () => {
  console.log(`alive on localhost:${PORT}!`);
});