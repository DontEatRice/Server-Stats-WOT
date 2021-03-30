const express = require('express');
const router = express.Router();
const Stats = require('../models/stats');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/eu');
});

const main = (res, loc) => {
  res.render('main', {loc: loc});
}

router.get('/:server', (req, res, next) => {
  switch (req.params.server.toUpperCase()) {
    case 'EU':
        main(res, 'EU');
        break;
    case 'NA':
        main(res, 'NA');
        break;
    case 'RU':
        main(res, 'RU');
        break;
    case 'ASIA':
        main(res, 'ASIA');
        break;
    default:
        next();
        break;
  }
})

router.get('/:type', (req, res, next) => {
  const type = req.params.type.toUpperCase();
  if (type === 'WEEK' || type === 'MONTH') {
    res.render('squares');
  } else {
    next();
  }
})
module.exports = router;
