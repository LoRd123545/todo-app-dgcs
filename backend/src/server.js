'use strict';

/* node js modules */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';

/* packages */
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import Kc from 'keycloak-connect';

/* project modules */
import db from './config/mysql-config.js'

/* routers */
import accountRouter from './routes/account.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import homeRouter from './routes/home.js'

/* environment variables */
dotenv.config({
  path: '../.env'
});

const {
  PORT,
  SESSION_SECRET,
  KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_USER,
  KEYCLOAK_CLIENT_USER_PASSWORD,
  KEYCLOAK_GRANT_TYPE,
  KEYCLOAK_CLIENT,
  KEYCLOAK_CLIENT_SECRET
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
app.use('/tasks', kc.protect(), tasksRouter);
app.use('/account', kc.protect(), accountRouter);
app.use('/admin', kc.protect('admin'), adminRouter);

app.use('*', async (req, res) => {
  res.json({
    message: 'Don\'t know what you\'re looking for bruh'
  });
});

db.init().
  then((message) => {
    // https.createServer(httpsOptions, app).listen(port, () => {
    //   console.log(message);
    //   console.log(`alive on localhost:${port}!`);
    // });
    app.listen(port, () => {
      console.log(message);
      console.log(`alive on localhost:${port}!`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  db.teardown()
  .then(() => {
    process.exit();
  })
  .catch(() => {})
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);