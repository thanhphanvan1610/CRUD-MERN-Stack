import express from 'express'
import Users from '../models/Users.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/signup', async(req, res) => {
    const {username, password, email} = req.body
    if(!username || !password){
        return res.status(401).json('Require Username & Password')
    }
    const UserExist = await Users.findOne({username})
    if(UserExist){
        return res.status(401).json('Account Exist!')
    }
    try {
        const newUser = new Users({ username, password, email });
        const Salt = 10;
        const hashedPassword = await bcrypt.hash(password, Salt);
        newUser.password = hashedPassword;
        const saveUser = await newUser.save();
        return res.status(200).json(saveUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json("Required Username & password")
    }
    try {
        const user = await  Users.findOne({username})
        if(!user){
            return res.status(400).json('Not Found User')
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!user || !passwordMatch){
            return res.status(400).json('Username or Password invalid')
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

export default router