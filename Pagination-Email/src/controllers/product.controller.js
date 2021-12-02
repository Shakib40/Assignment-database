const express = require('express');

const sendMail = require('../utils/send-mail');

const Product = require("../models/product.model");


const router = express.Router();

router.post("/" , async(req , res) =>{
    try{
       
        
        const product = await Product.create(req.body);
        
        sendMail( "shakib@gmail.com" , 
                  "jilani@gmail.com" ,
                   `New Products ${req.body.name}` ,
                   "Created a new product",
                    "<p>Created a new product</p>",
                    [
                        {   
                            path: 'C:\Users\shakib\Desktop\Unit4\Back\pagination\src\name.txt',
                        }
                    ]
                   )

        return res.status(201).json( {product} );

    }catch(err){
         return res.status(500).json({status:"Failed" ,  message: err.message});
    }

});


router.get('/' , async (req, res) => {
    try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
 
        const skip = (page-1)* size;

        const products = await Product.find().skip(skip).limit(size).lean().exec();
        
        const totalPages = Math.ceil( (await Product.find().countDocuments())  / size);

        return res.json( {products , totalPages});

    }catch(err){
         return res.status(500).json({status:"failed" ,  message: err.message});
    }
});

module.exports = router;