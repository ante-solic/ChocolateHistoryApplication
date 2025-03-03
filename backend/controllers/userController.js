const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')

const registerUser = async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      const existingUser = await User.findOne({ where: { username }});
  
      if(existingUser){
          return res.status(400).json({ message: "Username already in use!"});
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({ username, password: hashedPassword, role });
  
      res.status(201).json({ message: "User created!", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const loginUser = async(req, res) => {
    try{
        const { username, password } = req.body;
        
        const user = await User.findOne({where: {username}})

        if(!user){
            return res.status(404).json({error: "User not found!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({error: "Invalid password"});
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, password: user.password, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        )

        return res.status(200).json({ message: "Login successful", token});
    } catch(error){
        return res.status(500).json({ error: error.message});
    }
}

const getAllUsers = async(req, res) => {
    try{
        let users = await User.findAll()

        return res.status(200).json({ users })
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const getUser = async(req, res) => {
    try{
        const user_id = req.params.id

        const user = await User.findOne({ where: { id: user_id }});

        if(!user){
            return res.status(404).json({ message: "User not found!" });
        }

        return res.status(200).json({ user });
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { loginUser, registerUser, getAllUsers, getUser}