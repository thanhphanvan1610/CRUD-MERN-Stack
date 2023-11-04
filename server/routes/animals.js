import express from 'express'
import Animals from '../models/animals.js'

const router = express.Router()
router.post('/', async(req, res) => {
    const {name, species, longity,enviroment} = req.body
    try {
        const newAnimal = new Animals({name, species, longity, enviroment})
        //Model.create
        const saveAnimal = await newAnimal.save()
        return res.status(200).json(saveAnimal)
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get('/', async(req, res) => {
    
    try {
        const animals = await Animals.find()
        return res.status(200).json(animals)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        
        const animal = await Animals.findById(id)
        if(animal===null){
            return res.status(404).json('Not found Animal')
        }
        return res.status(200).json(animal)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/:id', async(req, res) => {
    const {id} = req.params
    const {name, species, longity,enviroment} = req.body
    
    try {
        if(!name){
            return res.status(401).json('required field')
        }
        const animal = await Animals.findByIdAndUpdate(id, req.body)
        if(!animal){
            return res.status(404).json('Not found')
        }
        return res.status(200).json({message: 'Update Successful!!', data: animal })

    } catch (error) {
        return res.status(500).json(error.message)
    }
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const animal = await Animals.findByIdAndDelete(id)
        if(!animal){
            return res.status(404).json('Not found Animals')
        }
        return res.status(200).json({message: `delete successful ${animal.name}`})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

export default router