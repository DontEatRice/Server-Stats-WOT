const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
// const Stats = require('./models/stats').EU
const cors = require('cors')
// const Server = require('./models/server')
dotenv.config();

const indexRouter = require('./routes/index');
const errorRouter = require('./routes/error')

mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/error', errorRouter);

app.use((req, res) => {
    res.status(404);
    res.render('error', {message: '404 page not found'})
})


module.exports = app;

