const mongoose = require('mongoose');
const { Schema } = mongoose;
const serverSchema = new Schema({name: String, players: {type: Number, default: 0}})

const statsSchema = new Schema({
    // EU1: {type: Number, required: true, default: 0},
    // EU2: {type: Number, required: true, default: 0},
    servers: {type: [serverSchema], default: undefined, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EU', statsSchema);