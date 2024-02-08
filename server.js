import express from 'express'
import cors from 'cors'
import { bugService } from './services/bug.service.js'

const app = express()
const port = 3030

const corsOptions = {
    origin: ['http://127.0.0.1:5174'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.static('public'))

// CRUDL

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', async (req, res) => {
    try {
        const bugs = await bugService.query()
        res.send(bugs)
    } catch (err) {
        res.status(400).send(`Couldn't get bugs...`)
    }
})

app.get('/api/bug/save', async (req, res) => {
    const { _id, title, severity, createdAt, description } = req.query
    const bugToSave = { _id, title, severity: +severity, createdAt:Date.now() }

    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        console.log(err)
        res.status(400).send(`Couldn't save bug...`)
    }
})

app.get('/api/bug/:bugId', async (req, res) => {
    var { bugId } = req.params

    const bug = await bugService.getById(bugId)
    res.send(bug)
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    var { bugId } = req.params

    try {
        await bugService.remove(bugId)
        res.send(`Bug ${bugId} removed`)
    } catch (err) {
        res.status(400).send(`Couldn't remove bug...`)
    }
})

app.listen(port, () => {
    // loggerService.info('Up and running on port', port)
    console.log(`Server ready at port ${port}`)
})



