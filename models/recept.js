const mongoose = require('mongoose');
const receptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true,
        default: undefined
    },
    owner: {
        type: String,
        default: 'anonymus'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('recept', receptSchema)