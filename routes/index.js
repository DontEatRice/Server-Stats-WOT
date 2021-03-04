var express = require('express');
var router = express.Router();
const Stats = require('../models/stats')


/* GET home page. */
router.get('/', function(req, res, next) {
  const findStats = Stats.find().limit(25).sort({date: 1})//{date: {"$lte": drugi.toISOString()}}
  findStats.exec((err, data) => {
    if (err)
      res.render('error', {message: err});
    else 
      res.render('main', { data: data});
  })
});

router.get('/api', (req, res) => {
  // const drugi = new Date();
  const findStats = Stats.find()//{date: {"$lte": drugi.toISOString()}}
  findStats.exec((err, data) => {
    if (err)
      res.send(err);
    else {
      // data.forEach((value) => {
      //   Stats.findByIdAndRemove(value.id, err => {
      //     if (err)
      //       console.log(err)
      //     else
      //       console.log('Sukces')
      //   })
      // });
      // console.log('koniec')
      res.send(data)
    } 
      
  })
  
})

module.exports = router;
