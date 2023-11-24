/* external libs */
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const PORT = process.env.PORT || 3000;
const memoryStore = session.MemoryStore();

/* ejs, express ejs layouts and static files config */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressEjsLayouts);
app.use(express.static(__dirname + '/static'));

/* keycloak config */
const keycloak = new Keycloak({
  store: memoryStore
});
app.use(keycloak.middleware({
  logout: '/logout'
}));

/* config */
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

/* app routes */
app.use('/', homeRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/tasks', tasksRouter);
app.use('/account', accountRouter);

// keycloak test - error
app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('Protected');
});

app.listen(PORT, () => {
  console.log(`alive on localhost:${PORT}!`);
});