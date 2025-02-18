import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'

configDotenv()

const DB_URI = process.env.DATABASE_URI

if(!DB_URI){
    throw new Error('database uri error')
}


const connectToDdataBase = async () => {
    try{
        await mongoose.connect(DB_URI)
        console.log("connected to database successfully")
    }catch(err){
        console.error('Error to database: ', err)


    }
}


export default connectToDdataBase