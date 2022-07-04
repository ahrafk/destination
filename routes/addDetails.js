const { application } = require('express')
const express = require('express')
const router = express.Router()
const countriesSchema = require('../models/countriesSchema')

// GET ALL COUNTRIES and DESTINATIONS
router.get('/', async (req,res) =>{
    try{
        const countries = await countriesSchema.find()
        res.json(countries)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})

// GET ONE COUNTRY
router.get('/:id', getCountries, (req, res) => {
    res.json(res.countryId)
})

// ADD COUNTRIES and DESTINATIONS
router.post('/', async (req, res) => {
    const AddCountries = new countriesSchema({
        country: req.body.country,
        iso_code: req.body.iso_code,
        destinations: req.body.destinations
    })
    try{
        const newCountry = await AddCountries.save()
        res.status(201).json(newCountry)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

// EDIT COUNTRY DETAILS
router.patch('/:id', getCountries, async (req, res) =>{
    if(req.body.country != null){
        res.countryId.country = req.body.country
    }
    if(req.body.iso_code != null){
        res.countryId.iso_code = req.body.iso_code
    }
    if(req.body.destinations != null){
        res.countryId.destinations = req.body.destinations
    }
    try{
        const updatedCountry = await res.countryId.save()
        res.json(updatedCountry)
    } catch(err){
        res.status(400).json({ message: err.message})
    }
})

// DELETE COUNTRIES AND DESTINATIONS
router.delete('/:id', getCountries, async (req, res) =>{
    try{
        await res.countryId.remove()
        res.json({ message: 'Successfully Deleted!'})
    } catch(err){
        res.status(500).json({ message: err.message})
    }
})

async function getCountries(req, res, next) {
    let countryId
    try{
        countryId = await countriesSchema.findById(req.params.id)
        if (countryId == null){
            return res.status(404).json({ message: 'NAN'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }

    res.countryId = countryId
    next()
}
module.exports = router