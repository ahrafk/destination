const mongoose = require('mongoose')

const countriesSchema = new mongoose.Schema({
    
    country:{
        type: String,
        required: true
    },
    iso_code:{
        type: String,
        required: true
    },
    destinations:{
        type: [String],
        required: true
    }
    

})

module.exports = mongoose.model('countries', countriesSchema)