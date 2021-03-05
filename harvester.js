const fetch = require('node-fetch');
const dotenv = require('dotenv')
const Stats = require('./models/stats')

const servers = [{schema: Stats.EU, name: "eu"}, {schema: Stats.RU, name: "ru"}, {schema: Stats.NA, name: "com"}, {schema: Stats.ASIA, name: "asia"}]
dotenv.config()

const hourlyHarvest = () => {
    servers.forEach((server) => {
        const apiLink = `https://api.worldoftanks.${server.name}/wgn/servers/info/?application_id=${process.env.APP_ID}`
        fetch(apiLink)
            .then(response => response.json())
            .then(data => {
                const stats = data.data.wot
                let arr = []
                stats.forEach((values) => {
                    arr.push({name: values.server, players: values.players_online});
                })
                const dataToPush = new server.schema({servers: arr})
                const errors = dataToPush.validateSync();
                if (errors) console.log(errors);
                dataToPush.save(err => {
                    if (err){
                        console.log(err)
            }   
            })
        });
    })
}

module.exports = hourlyHarvest;