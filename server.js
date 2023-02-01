const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

// connects our backend code with the database

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const SECRET = process.env.SECRET;

connectionString =
  connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.telw8lc.mongodb.net/ShopListApp?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: connectionString,
      collection: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

const listsRoutes = require('./routes/lists.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api', listsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.listen(process.env.PORT || '8000', () => {
  console.log('Server is running on port: 8000');
});
