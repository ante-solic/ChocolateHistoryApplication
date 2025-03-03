const { Manufacturer } = require('../models')
const { where } = require('sequelize');


const createManufacturer = async(req, res) => {
    try{
        const { name, year, country, description, logo } = req.body

        const existingManufacturer = await Manufacturer.findOne({ where: { name: name }})

        if (existingManufacturer) {
            return res.status(400).json({ message: "Manufacturer with the same name already exists" });
        }

        const manufacturer = await Manufacturer.create({ name, year, country, description, logo })

        return res.status(200).json({ message: "Manufacturer created", manufacturer})
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const editManufacturer = async(req, res) => {
    try{
        const manufacturer_id = req.params.id

        const { name, year, country, description, logo } = req.body

        const manufacturer = await Manufacturer.findOne({ where: { id: manufacturer_id }})

        if(!manufacturer){
            return res.status(404).json({ message: "Manufacturer not found!" });
        }

        if(name){
            manufacturer.name = name
        }
        if(year){
            manufacturer.year = year
        }
        if(country){
            manufacturer.country = country
        }
        if(description){
            manufacturer.description = description
        }
        if(logo){
            manufacturer.logo = logo
        }

        await manufacturer.save()

        return res.status(200).json({ message: "Manufacturer updated successfully!", manufacturer})
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteManufacturer = async(req, res) => {
    try{
        const manufacturer_id = req.params.id

        const manufacturer = await Manufacturer.findOne({ where: { id: manufacturer_id }});

        if(!manufacturer){
            return res.status(404).json({ message: "Manufacturer not found!" });
        }

        await manufacturer.destroy();

        return res.status(200).json({ message: "Manufacturer deleted successfully!" });
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const getAllManufacturers = async(req, res) => {
    try{
        const manufacturers = await Manufacturer.findAll()

        return res.status(200).json({ manufacturers })
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

const getManufacturer = async(req, res) => {
    try{
        const manufacturer_id = req.params.id

        const manufacturer = await Manufacturer.findOne({ where: { id: manufacturer_id }});

        if(!manufacturer){
            return res.status(404).json({ message: "Manufacturer not found!" });
        }

        return res.status(200).json({ manufacturer });
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { createManufacturer, editManufacturer, deleteManufacturer, getManufacturer, getAllManufacturers }