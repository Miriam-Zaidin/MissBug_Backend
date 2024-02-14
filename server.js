import express from 'express'
import cors from 'cors'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3030

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
}

// App configuration
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json())


// Routes
import { bugRoutes } from './api/bug/bug.routes.js'
import { userRoutes } from './api/user/user.routes.js'

app.use('/api/bug', bugRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => res.send('Hello there'))

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

app.listen(port, () => {
    // loggerService.info('Up and running on port', port)
    console.log(`Server ready at port ${port}`)
    loggerService.info(`Up and running on port ${port}`)
})



