const express=require('express');
const pool=require('../util/database').pool
const router=express.Router();

router.post('/order',async(req,res)=>{
    const {email}=req.body;
    console.log(req.body)
   
   
try{

    const data=await pool.query(`SELECT o.order_id , p.name,p.product_id,p.price
    FROM orders as o
    INNER JOIN products as p ON p.product_id = o.product_id 
    where o.cx_email="${email}"
`);


if(data[0].length>0){
    res.status(200).json({message:data[0]})
}else{
    res.json({message:[]})
}

}catch(err){
    res.status(500).send(err.message)
}
  

})



router.post('/take_order',async(req,res)=>{
    console.log(req.body)
    const {email,order}=req.body;

try{

  order.forEach(async(ele) => {
    const dbRes= await pool.query(` insert into orders (cx_email,product_id) 
    values ('${email}',(select p.product_id from products as p where p.name='${ele.name}'))

    `)
    
  }); 
  
  res.send('done')


}catch(er){
res.status(500).json(er.message)
}

})

module.exports=router