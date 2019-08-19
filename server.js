const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connceted to database'));

app.use(express.json());

const myRouter = require('./routes/recepts')
app.use('/recepts', myRouter);

app.listen(3000, () => console.log('Server Started'));