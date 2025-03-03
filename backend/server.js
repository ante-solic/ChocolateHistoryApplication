require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const express = require('express');
const cors = require('cors');
const userRoutes  = require('./routes/userRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()
const port = 3000

connectDB();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };
app.use(cors());

// User api

app.use('', userRoutes);

// Manufacturer api

app.use('', manufacturerRoutes);

//Product api

app.use('', productRoutes);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


module.exports = { app, server };