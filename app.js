const express = require('express')
const cors = require('cors')
const PORT=process.env.PORT || 3000;
const adminRout =require('./route/admin')
const userRoute=require('./route/user')
const loginRoute=require('./route/login')
const path=require('path')
const app= express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve('public')));

app.use(adminRout)

app.use(userRoute)

app.use(loginRoute)

app.use(require('./route/paginate'))


app.listen(PORT,()=> console.log('sever is up and running....,,,'))