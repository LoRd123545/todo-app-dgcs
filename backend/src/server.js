'use strict';

/* node js modules */
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import fs from 'fs';

/* packages */
import dotenv from 'dotenv';
import express from 'express';
// import expressEjsLayouts from 'express-ejs-layouts'; /* move to frontend */
import session from 'express-session';
import methodOverride from 'method-override';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import Kc from 'keycloak-connect';

/* project modules */
import db from './config/mysql-config.js'

/* routers */
import homeRouter from './routes/home.js';
import aboutRouter from './routes/about.js';
import faqRouter from './routes/faq.js';
import accountRouter from './routes/account.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';

/* environment variables */
dotenv.config({
  path: '../.env'
});

const {
  PORT: PORT,
  SESSION_SECRET: SESSION_SECRET,
  KEYCLOAK_BASE_URL: KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM: KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_USER: KEYCLOAK_CLIENT_USER,
  KEYCLOAK_CLIENT_USER_PASSWORD: KEYCLOAK_CLIENT_USER_PASSWORD,
  KEYCLOAK_GRANT_TYPE: KEYCLOAK_GRANT_TYPE,
  KEYCLOAK_CLIENT: KEYCLOAK_CLIENT,
  KEYCLOAK_CLIENT_SECRET: KEYCLOAK_CLIENT_SECRET
} = process.env;

/* handy variables */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = PORT || 3000;
const sessionStore = new session.MemoryStore();

/* https config */
// const httpsOptions = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.crt')
// };

/* session config */
const sessionInit = {
  secret: SESSION_SECRET,
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
  baseUrl: KEYCLOAK_BASE_URL,
  realmName: KEYCLOAK_REALM
});

/* ejs, express ejs layouts and static files config */
/* move to frontend */
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(expressEjsLayouts);
// app.use(express.static(__dirname + '/static'));

/* general config */
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

kcAdminClient.auth({
  username: KEYCLOAK_CLIENT_USER,
  password: KEYCLOAK_CLIENT_USER_PASSWORD,
  grantType: KEYCLOAK_GRANT_TYPE,
  clientId: KEYCLOAK_CLIENT,
  clientSecret: KEYCLOAK_CLIENT_SECRET
});

/* app routes */
app.use('/', homeRouter);
app.use('/auth', kc.protect(), authRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/tasks', kc.protect(), tasksRouter);
app.use('/account', kc.protect(), accountRouter);
app.use('/admin', kc.protect('admin'), adminRouter);

db.init().then((message) => {
  // https.createServer(httpsOptions, app).listen(port, () => {
  //   console.log(message);
  //   console.log(`alive on localhost:${port}!`);
  // });
  app.listen(port, () => {
    console.log(message);
    console.log(`alive on localhost:${port}!`);
  });
}).catch(err => {
  console.error(err);
  process.exit(1);
});

const gracefulShutdown = () => {
  db.teardown()
    .catch(() => {})
    .then(() => {
      process.exit();
    })
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);