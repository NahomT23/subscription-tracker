import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })
        res.status(201).json({
            success: true,
            data: subscription
        })
    }catch(error){
        next(error)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        // CHECK IF THE SUER IS THE SAME AS THE ONE WITH THE TOKEN
        if(req.user.id !== req.params.id){
            const error = new Error("you are not the owner")
        }

    }catch(error){
        next(error)
    }
}