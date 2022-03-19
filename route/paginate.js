const express=require('express');
const pool=require('../util/database').db
const router=express.Router();




router.get('/get_products',async(req,res)=>{
    const {page,limit}=req.query;
    const pageStart=(page-1)*limit;
    
    try{
        const data =await pool(`select * ,(select count(*) from products) as total from products limit ${parseInt(pageStart)},${parseInt(limit)}  `)
   console.log(data)
    res.send(data)  
    }catch(er){
        console.log(er.message)
        res.send(er.message)
    }
  
    
})


module.exports=router;







module.exports=router;