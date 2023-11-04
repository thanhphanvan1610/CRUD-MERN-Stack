import express from 'express';
import * as dotenv from 'dotenv';
import connect from './database/database.js';
import AnimalRouter from './routes/animals.js'
import cors from 'cors'
import Auth from './routes/users.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use(express.json())
// app.use(cors())

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
        
    })
)

app.get('/', (req, res) => {
    res.json({Message: 'Landing Page'})
})

app.use('/animals', AnimalRouter)
app.use('/user', Auth)


app.listen(PORT, async() => {
    await connect();
    console.log(`Server running on port ${PORT}`)

})


