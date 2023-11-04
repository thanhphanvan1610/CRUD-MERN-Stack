import mongoose, { Schema } from "mongoose";

const AnimalsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species:{
        type: String
    },
    longity:{
        type: Number
    },
    enviroment:{
        type: String
    }
    

}, {
    timestamps: true
}
)
const Animals = mongoose.model('animals', AnimalsSchema)
export default Animals