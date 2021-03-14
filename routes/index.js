var express = require('express');
var router = express.Router();
const Stats = require('../models/stats')

const randomString = () => {
  return Math.random().toString(36).substr(2, 8);
}

const getData = (res, db, loc, mode) => {
  const findStats = db.find().sort({date: -1}).limit(25).select("servers date")//{date: {"$lte": drugi.toISOString()}}
  findStats.exec((err, data) => {
    if (err)
      res.render('error', {message: err});
    else 
      res.render('main', { data: data, loc: loc, mode: mode});
  })
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/eu');
});

router.get('/eu', (req, res) => {
  getData(res, Stats.EU, 'EU');
})

router.get('/na', (req, res) => {
  getData(res, Stats.NA, 'NA');
});

router.get('/ru', (req, res) => {
  getData(res, Stats.RU, 'RU');
});

router.get('/asia', (req, res) => {
  getData(res, Stats.ASIA, 'ASIA');
});

router.get('/week/:serv', (req, res, next) => {
  switch (req.params.serv.toLowerCase()) {
    case 'eu':
      res.send('hello');
      break;
    case 'ru':
      res.send('hello');
      break;
    default:
      res.redirect(`/${randomString()}`);
      break;
  }
})


module.exports = router;
