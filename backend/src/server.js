/* node js modules */
import http from 'node:http';
import fs from 'node:fs/promises';

/* packages */
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Kc from 'keycloak-connect';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'

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
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
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
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_URI
  }),
};
app.use(session(sessionInit));

/* keycloak config */
const kc = new Kc({
});
app.use(kc.middleware({
  logout: '/logout'
}));

const kcAdminClient = keycloak.init();

/* general config */
app.use(cors({
  origin: '*'//'http://frontend:8080'
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
  console.log(`websocket: connected ${socket.id}`);
  // emitter.on('task-expired', async (data) => {
  //   socket.emit('task-expired', {
  //     taskID: data.taskID,
  //     username: data.username
  //   });
  // });
  socket.on('disconnect', () => {
    console.log(`websocket: disconnected ${socket.id}`);
  });
});

emitter.on('task-expired', (data) => {
  console.log(data);
  io/*.to(data.username)*/.emit('task-expired', data);
});

// connecting to mongodb
mongoose.connect(process.env.CONNECTION_URI, {
  dbName: process.env.MYSQL_DATABASE,
})
  .catch(async (err) => {
    const newErr = {
      name: err.name,
      description: err.message,
      info: `for more information check logs in directory ${process.env.PWD}/logs`,
    };

    await fs.writeFile(`${process.env.PWD}/logs/logs.txt`, JSON.stringify(err), {
      flag: 'a',
    });

    console.error(newErr);
    gracefulShutdown();
  });

const db = mongoose.connection;

// checking for errors
db.on('error', (err) => {
  const newErr = {
    name: err.name,
    description: err.message,
    cause: err.cause,
    info: `for more information check logs in directory ${process.env.PWD}/logs`,
  };



  console.error(newErr);
  gracefulShutdown();
});

// once opened
db.once('open', () => {
  console.log('Connected to remote mongodb cluster🗃️');
});

// listening on specified port (for now 3000)
server.listen(port, () => {
  console.log(`Alive on localhost:${port}🔥🔥🔥`);
});

// graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down server...');

  // disconnect all clients
  io.disconnectSockets();

  // close websocket connection
  io.close((err) => {
    console.error(err);
  });

  // force closing db connection
  await db.close(true);

  // stop server from accepting new connections
  server.close(() => {
    console.log('server closed!');
  });
  // close all remaining connections
  server.closeAllConnections();

  // exit node js process
  process.exit(0);
};

// situations when server should be shut down
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);