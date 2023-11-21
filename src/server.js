const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const mysql = require('./conifg/mysql-config');
const app = express();
const PORT = 3000;
const memoryStore = session.MemoryStore();
const keycloak = new Keycloak({
  store: memoryStore
});

app.set('view-engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(keycloak.middleware({
  logout: '/logout'
}));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('Protected');
});

app.get('/dbtest', async (req, res) => {
  const result = await mysql.query('SELECT * FROM test');
  res.send(result[0]);
});

app.listen(PORT, () => {
  console.log(`alive on localhost:${PORT}!`);
});