const express =require('express');
const pool = require('../util/database').pool
const bcrypt=require('bcrypt')
const router =express.Router()



router.post('/signup',async(req,res,next)=>{
    // const email=req.body.email
    // const name=req.body.name

const {name,password,email,phone}=req.body;
console.log(req.body)
 const hashedPass= await bcrypt.hash(password,10)
 pool.query(`insert into user_table (email,password,name,number) values('${email}','${hashedPass}','${name}',${phone})`)
 .then(()=>  res.status(201).json({message:"signed up successfully"}))
 .catch((er)=>    res.status(500).json({message:'error occured'}))
   
  


// res.status(200).json({message:"done"})


});

router.post('/login',async(req,res,next)=>{

const {password,email}=req.body;

console.log(email)

pool.query(`select * from user_table where email='${email}'`).then(async(rs)=>{
   

    
    if(rs[0].length>0){
       console.log(rs[0])
        const checkPass= await bcrypt.compare(password,rs[0][0].password)
        // console.log(req.body.password)
        // console.log(checkPass)
        if(checkPass){
            // window.location.href="./todo.html";

            res.status(200).json({message:'logged in successfully'})

             return
        }else{
            res.status(500).json({message:'passowrd incorrect'})
            return
        }

    }else{
        res.status(500).json({message:'please enter a valid email'})
        return
    }
    
}).catch(er=>  {
    // console.log(er)
    res.status(500).json({message:'error occured'})
    
})



})



module.exports=router