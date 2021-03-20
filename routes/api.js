const express = require('express');
const router = express.Router();
const Stats = require('../models/stats');

const getData = async (db, limit) => {
    try {
        const findStats = await db.find().sort({date: -1}).limit(limit).select("servers date").exec();
        return findStats
    } catch (e) {
        return {status: 'error', message: e};
    }
  }

router.get('/', async (req, res, next) => {
    if (req.query.type === 'hour' && req.query.server) {
        const limit = 48;
        let schema;
        switch (req.query.server.toUpperCase()) {
            case 'EU':
                schema = Stats.EU;
                break;
            case 'NA':
                schema = Stats.NA;
                break;
            case 'RU':
                schema = Stats.RU;
                break;
            case 'ASIA':
                schema = Stats.ASIA;
                break;
            default:
                res.status(400);
                res.json({message: 'bad request'});
                break;
        }
        const data = await getData(schema, limit);
        if (data.status === 'error')
            res.status(400);
        res.json(data);
    } else if (req.query.type === 'day' && !isNaN(req.query.limit) && req.query.limit !== '') {
        const data = await getData(Stats.DAY, parseInt(req.query.limit));
        if (data.status === 'error')
            res.status(400);
        res.json(data);
    } else {
        next();
    }
    
});

module.exports = router;