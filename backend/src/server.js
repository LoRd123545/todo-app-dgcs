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

/* project modules */
import db from './config/mysql-config.js';
import emitter from './middleware/events.js';
import keycloak from './config/kc-config.js';

/* routers */
import accountRouter from './routes/account.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';
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
app.use('/', homeRouter);
app.use('/auth', kc.protect(), authRouter);
app.use('/tasks', kc.protect(), tasksRouter);
app.use('/account', kc.protect(), accountRouter);
app.use('/admin', kc.protect('admin'), adminRouter);
app.use('*', notFoundRouter);

// const handleConnect = async (socket) => {
  
// }

// const handleTaskExpiration = async (data) => {
  
// }

io.on('connection', socket => {
  console.log(`connected ${socket.id}`);
  emitter.on('task-expired', async (data) => {
    const user = await kcAdminClient.users.findOne({
    id: data.userID
  })
    .then((userData) => {
      const taskID = data.taskID;
      const username = userData.username;
      socket.emit('task-expired', {
        taskID: taskID,
        username: username
      });
    })
    .catch((err) => {
      console.error(err);
      socket.emit('error', {
        message: "error"
      })
    });
  });
  socket.on('disconnect', () => {
    console.log(`disconnected ${socket.id}`);
  });
});

// io.on('connect', socket => {
  
// });

// io.on('disconnect', () => {
//   emitter.off('task-expired', handleTaskExpiration);
// })

db.init().
  then((message) => {
    server.listen(port, () => {
      console.log(message);
      console.log(`alive on localhost:${port}!`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  server.close(() => {
    io.close();
    db.teardown()
    .then(() => {
      process.exit();
    })
    .catch(() => {})

    console.log('server closed!');
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);