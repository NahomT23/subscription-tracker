import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        minLength: 5,
        lowercase: true,
        maxLength: 225,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 4,
    }
}, {timestamps: true} )

const User = mongoose.model('User', userSchema)


export default User