var express = require('express');
var router = express.Router();
const Stats = require('../models/stats')

const getData = (res, db, loc, mode) => {
  const findStats = db.find().sort({date: -1}).limit(48).select("servers date")//{date: {"$lte": drugi.toISOString()}}
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

router.get('/week', (req, res) => {
  const findStats = Stats.DAY.find().sort({date: -1}).limit(7).select("servers date")//{date: {"$lte": drugi.toISOString()}}
  findStats.exec((err, data) => {
    if (err)
      res.render('error', {message: err});
    else 
      res.render('squares', { data: data, mode: 7});
  })
})

router.get('/month', (req, res) => {
  const findStats = Stats.DAY.find().sort({date: -1}).limit(31).select("servers date")//{date: {"$lte": drugi.toISOString()}}
  findStats.exec((err, data) => {
    if (err)
      res.render('error', {message: err});
    else 
      res.render('squares', { data: data, mode: 31});
  })
})

module.exports = router;
