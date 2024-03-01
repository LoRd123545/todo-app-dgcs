/* node js modules */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

/* packages */
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Kc from 'keycloak-connect';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

/* project modules */
import emitter from './middleware/events.js';
import keycloak from './config/kc-config.js';

/* routers */
import accountRouter from './routes/account.js';
import tasksRouter from './routes/tasks.js';
import adminRouter from './routes/admin.js';
import homeRouter from './routes/home.js';
import notFoundRouter from './routes/not-found.js';

/* environment variables */
const {
  PORT,
  SESSION_SECRET,
} = process.env;

/* handy variables */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const port = PORT || 3000;
const sessionStore = new session.MemoryStore();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000'
  }
});

/* session config */
const sessionInit = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store: sessionStore,
};
app.use(session(sessionInit));

/* keycloak config */
const kc = new Kc({
  store: sessionStore
});
app.use(kc.middleware({
  logout: '/logout'
}));

const kcAdminClient = keycloak.init();

/* general config */
app.use(cors({
  origin: 'http://localhost:4000'
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* app routes */
app.use('/', homeRouter());
app.use('/tasks', kc.protect(), tasksRouter());
app.use('/account', kc.protect(), accountRouter());
app.use('/admin', kc.protect('admin'), adminRouter());
app.use('*', notFoundRouter());

io.on('connection', socket => {
  console.log(`connected ${socket.id}`);
  emitter.on('task-expired', async (data) => {
    socket.emit('task-expired', {
      taskID: data.taskID,
      username: data.username
    });
  });
  socket.on('disconnect', () => {
    console.log(`disconnected ${socket.id}`);
  });
});

mongoose.connect(process.env.CONNECTION_URI, {
  dbName: process.env.MYSQL_DATABASE,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to remote mongodb cluster🗃️');
});

server.listen(port, () => {
  console.log(`Alive on localhost:${port}🔥🔥🔥`);
});

const gracefulShutdown = () => {
  server.close(() => {
    io.close();
    db.close()
      .then(() => {
        process.exit();
      })
      .catch(() => { })
    console.log('server closed!');
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);