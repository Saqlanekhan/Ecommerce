const express =require('express');
const pool = require('../util/database').pool

const router =express.Router()



router.post('/addproduct',(req,res,next)=>{
    const {name,img,price,category}=req.body;
console.log(req.body)
    pool.query(`INSERT INTO products (name,price,image_url,category) values('${name}','${price}','${img}','${category}')`)
    .then(rs =>{
        res.status(200).json({message:'successfully inserted to DB'})
    } )
    .catch(err => {
        res.status(500).json({message:'error while inserting to DB'})
    });


})

module.exports=router