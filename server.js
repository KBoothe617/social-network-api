// import express, db, and routes
import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

// port and express
const PORT = process.env.PORT || 3001;
const app = express();

// app listen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// db connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});