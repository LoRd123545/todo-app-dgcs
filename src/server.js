'use strict';

/* node js modules */
import path from 'path';
import { fileURLToPath } from 'url';

/* packages */
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import methodOverride from 'method-override';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import Kc from 'keycloak-connect';

/* routers */
import homeRouter from './routes/home.js';
import aboutRouter from './routes/about.js';
import faqRouter from './routes/faq.js';
import accountRouter from './routes/account.js';
import tasksRouter from './routes/tasks.js';
import apiRouter from './routes/api.js';

/* handy variables */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const sessionStore = new session.MemoryStore();

/* session config */
const sessionInit = {
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionInit));

/* keycloak config */
const kc = new Kc({
  store: sessionStore
});
app.use(kc.middleware({
  logout: '/logout'
}));
const kcAdminClient = new KcAdminClient({
  baseUrl: 'http://host.docker.internal:8080',
  realmName: 'demo'
});

/* ejs, express ejs layouts and static files config */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressEjsLayouts);
app.use(express.static(__dirname + '/static'));

/* general config */
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

kcAdminClient.auth({
  username: 'admin',
  password: 'admin',
  grantType: 'client_credentials',
  clientId: 'client1',
  clientSecret: 'uybBZBiFFnYwJR89OnJVcRwweRfyRSSD'
});

/* app routes */
app.use('/', homeRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/tasks', kc.protect(), tasksRouter);
app.use('/account', kc.protect(), accountRouter);

app.get('/protected', kc.protect(), async (req, res) => {
  res.send(await kcAdminClient.users.find({}));
});

/* api */
app.use('/api', apiRouter);

/* app listens on PORT */
app.listen(PORT, () => {
  console.log(`alive on localhost:${PORT}!`);
});