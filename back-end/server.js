const express = require('express')
const cors = require('cors')
const app = express()
const exampleRouter = require('./src/routes/exampleRoute')

app.use(express.json())
app.use(cors())

app.use('/api/exampleRoute', exampleRouter)

const PORT = 4000
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))   