import { Router } from 'express'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send("get all subscriptions")
})


subscriptionRouter.get('/:id', (req, res) => {
    res.send("get subscription by id")
})


subscriptionRouter.post('/', (req, res) => {
    res.send("create subscriptions")
})

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







