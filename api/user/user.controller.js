// User CRUDL API
import { userService } from './user.service.js';

// List
export async function getUsers(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query.txt || '',
        //     score: +req.query.score || 0,
        //     password: req.query.password || undefined,
        //     pageIdx: req.query.pageIdx || undefined
        // }
        // const sortBy = {
        //     sortField: req.query.sortBy ||'',
        //     sortDir: +req.query.sortDir||''
        // }
        // const users = await userService.query(filterBy, sortBy)
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        res.status(400).send(`Couldn't get users`)
    }
}

// Get
export async function getUser(req, res) {
    const { userId } = req.params
    try {
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        res.status(400).send(`Couldn't get user`)
    }
}


// Delete
export async function removeUser(req, res) {
    const { userId } = req.params

    try {
        await userService.remove(userId)
        res.send('Deleted OK')
    } catch (err) {
        res.status(400).send(`Couldn't remove user`)
    }
}


// Save
export async function addUser(req, res) {
    const { username, score, fullname, password } = req.body
    // Better use createUser()
    const userToSave = { username, score: +score, fullname, password }

    try {
        const savedUser = await userService.save(userToSave)
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(`Couldn't save user`)
    }
}

// Update
export async function updateUser(req, res) {
    const { _id, username, score, fullname, password='sec' } = req.body
    const userToSave = { _id, username, score: +score, fullname, password }
    console.log("userToSave: ", userToSave)

    try {
        const savedUser = await userService.save(userToSave)
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(`Couldn't save user`)
    }
}