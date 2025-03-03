const { Product } = require('../models')
const { where } = require('sequelize');


const createProduct = async(req, res) => {
    try{
        const { name, price, type, percentage, color, manufacturerId } = req.body

        const existingProduct = await Product.findOne({ where: { name: name }})

        if (existingProduct) {
            return res.status(400).json({ message: "Product with the same name already exists" });
        }

        const product = await Product.create({ name, price, type, percentage, color, manufacturerId })

        return res.status(200).json({ message: "Product created", product})
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const editProduct = async(req, res) => {
    try{
        const product_id = req.params.id

        const { name, price, type, percentage, color, manufacturerId } = req.body

        const product = await Product.findOne({ where: { id: product_id }})

        if(!product){
            return res.status(404).json({ message: "Product not found!" });
        }

        if(name){
            product.name = name
        }
        if(price){
            product.price = price
        }
        if(type){
            product.type = type
        }
        if(percentage){
            product.precentage = percentage
        }
        if(color){
            product.color = color
        }
        if(manufacturerId){
            product.manufacturerId = manufacturerId
        }

        await product.save()

        return res.status(200).json({ message: "Product updated successfully!", product})
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async(req, res) => {
    try{
        const product_id = req.params.id

        const product = await Product.findOne({ where: { id: product_id }});

        if(!product){
            return res.status(404).json({ message: "Product not found!" });
        }

        await product.destroy();

        return res.status(200).json({ message: "Product deleted successfully!" });
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const getAllProducts = async(req, res) => {
    try{
        const products = await Product.findAll()

        return res.status(200).json({ products })
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

const getProduct = async(req, res) => {
    try{
        const product_id = req.params.id

        const product = await Product.findOne({ where: { id: product_id }});

        if(!product){
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.status(200).json({ product });
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { createProduct, editProduct, deleteProduct, getProduct, getAllProducts }