const express = require('express');
const DBConnect = require('./config/dbConnect');
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
DBConnect()
const AuthRouter = require('./routes/AuthRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandel');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/user',AuthRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT , ()=>{
  console.log(`Server is running PORT ${PORT}`)
})