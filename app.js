const express = require('express')
const cors = require('cors')

const adminRout =require('./route/admin')
const userRoute=require('./route/user')
const app= express()
app.use(cors())
app.use(express.json())

app.use(adminRout)

app.use(userRoute)



app.listen(3000,()=> console.log('sever is up and running....,,,'))