import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
configDotenv()

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email });


        if(existingUser){
            const error = new Error("User already exisits")
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session } )

        const token = jwt.sign(
            { userId: newUsers[0]._id },       // Payload
            JWT_SECRET,                        // Secret
            { expiresIn: JWT_EXPIRES_IN }      // Options
          );
          
        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: `User ${name} created successfully`,
            data: {
                token,
                user: newUsers[0]
            }
        })
    }catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
} 


export const signIn = async (req, res, next) => {
      const { email, password } = req.body

      try{
        const user = await User.findOne({ email })

        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password")
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: `user signed in successfully`,
            data: {
                token,
                user,
            }
        })

      }catch(error){
        next(error)
      }
} 


export const signOut = async (req, res, next) => {
      
} 