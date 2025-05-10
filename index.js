const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan');
const port = process.env.PORT;
const userRoutes = require('./routes/users.routes');
const postRoutes = require('./routes/posts.routes');
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

app.use(morgan("combined"));

// express middelwares
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.use('/users',userRoutes)
app.use('/posts',postRoutes)



// global error handler
app.use((err,req,res,next)=>{
  const message = err?.message;
  res.status(err.statusCode || 500).send({
    statusCode : err.statusCode || 500,
    message: err.message || 'something went wrong',
    errors: err.details || []
  })
})



mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log("Mongoose Connected Successfully")
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


