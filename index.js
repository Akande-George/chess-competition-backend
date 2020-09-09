const express = require('express')
const app = express()
const cors = require('cors')
require('./db/mongoose');
//dotenv.config()

const port = 6000;
// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/players')

// middlewares 
app.use(cors())
app.use(express.json())
app.use('/api/user/', authRoute)
app.use('/players', postRoute)

app.listen(6000, ()=>{
    console.log(`server running on port ${port}`)
})