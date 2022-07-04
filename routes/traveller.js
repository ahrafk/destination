const express = require('express')
const router = express.Router()
const traveller = require('../models/countriesSchema')

// GET COUNTRIES ROUTE

router.get('/', async (req,res) =>{
    try{
        const countries = await traveller.find()
        res.json(countries)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})


module.exports = router

