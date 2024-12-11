// import express, db, and routes
import express from 'express';
import db from './config/connection';
import routes from './routes';

// port and express
const PORT = process.env.PORT || 3001;
const app = express();

