



const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling get requests'
    });
})
router.post('/',(req,res,next)=>{ 
    // const product = {
    //     name:req.body.name,
    //     price:req.body.price
    // };
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    product.save().then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message:'Handling post requests',
        createdProduct:product
    });
});
// router.get('/:productId', (req,res,next)=>{
//     const id = req.params.productId;
//     if(id === 'special'){
//         res.status(200).json({
//             message: 'you discovred special id',
//             id:id
//         })

//     }else{
//         res.status(200).json({message:'your pass id'})
//     }
// })
router.get('/:productId', (req,res,next)=> {
    console.log("Req Params: ", req.params.productId)
    const id = req.params.productId;
    console.log("Id: ", id);
    Product.findById(id).exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'no valid entry found'})
        }
        
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error:err})
});
});

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({message:'updated product'})
})
router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({message:'delted product'})
})
module.exports = router;