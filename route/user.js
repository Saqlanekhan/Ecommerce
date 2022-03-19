const express =require('express')
const pool = require('../util/database').pool;
const router =express.Router()

router.get('/getproducts',(req,res,next)=>{
pool.query('select * from products').then((rs)=>{
    res.status(200).json({message:rs[0]})

})
.catch(er=>res.status(500).json({message:'error occured'}))


})

module.exports=router