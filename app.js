const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
// const Stats = require('./models/stats').EU
const cors = require('cors')
const harvester = require('./harvester');
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
app.use('/error', errorRouter)

// const fastDane = () => {
//     let data = new Date();
//     data.setMinutes(0);
//     for(let i = 0; i<25; i++) {
//         const EU1 = Math.round(Math.random()*5000)
//         const EU2 = Math.round(Math.random()*5000)
//         const boo = [{name: 'EU1', players: EU1}, {name: 'EU2', players: EU2}]
//         // const table = [new Server(boo[0]), new Server(boo[1])]
//         // const e1 = table[0].validateSync();
//         // if (e1) console.log(e1)
//         // const e2 = table[1].validateSync();
//         // if (e2) console.log(e2)

//         const foo = {servers: boo, date: data.toISOString()}
//         data.setHours(data.getHours()-1)

//         const newStats = new Stats(foo)
//         const errors = newStats.validateSync();
//         if (errors) console.log(errors);
//         newStats.save(err => {
//             if (err){
//                 console.log(err)
//             } else
//                 console.log('sukces')
//         });
//     }
// }

setInterval(() => {
    harvester();
}, 60 * 1000 * 60)

module.exports = app;
