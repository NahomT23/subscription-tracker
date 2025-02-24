import { Router } from 'express'
import { createSubscription } from '../controllers/subscription.controller.js'
import { authorize } from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send("get all subscriptions")
})


subscriptionRouter.get('/:id', (req, res) => {
    res.send("get subscription by id")
})


subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
    res.send("edit a subscription")
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send("delete a subscription")
})


subscriptionRouter.get('/user/:id', (req, res) => {
    res.send("get all user subscription")
})

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send("cacnel subscription")
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send("get upcoming renewals")
})

export default subscriptionRouter







