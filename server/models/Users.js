import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const Users = mongoose.model('users', UserSchema)
export default Users