import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send("get all users")
})

userRouter.get('/:id', (req, res) => {
    res.send("get single user")
})

userRouter.post('/', (req, res) => {
    res.send("creating a new user")
})


userRouter.put('/:id', (req, res) => {
    res.send("update a user")
})


userRouter.delete('/:id', (req, res) => {
    res.send("delete a user")
})

export default userRouter