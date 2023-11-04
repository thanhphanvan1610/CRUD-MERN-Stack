import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

const connect = ( async() => {
    try {
        let connection = await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`Connect to database!`)
        return connection
    } catch (error) {
        console.log(`Fail to connect to database`)
    }
})

export default connect

