const express = require('express');
const DBConnect = require('./config/dbConnect');
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
DBConnect()
const AuthRouter = require('./routes/AuthRoute')



app.use('/api/user',AuthRouter)




app.listen(PORT , ()=>{
  console.log(`Server is running PORT ${PORT}`)
})