const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.options('*', cors());

const uri = process.env.DB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } )
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection created successfully!')
})

const setsRouter = require('./routes/sets')
const activitiesRouter = require('./routes/activities')
const splitDaysRouter = require('./routes/splitDays')

app.use('/sets', setsRouter)
app.use('/activities', activitiesRouter)
app.use('/splitDays', splitDaysRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
