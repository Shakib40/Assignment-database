const express = require('express');

const sendMail = require('../utils/send-mail');

const Product = require("../models/product.model");


const router = express.Router();

const all_admin = [
    "admin1@gmail.com",
    "admin2@gmail.com",
    "admin3@gmail.com",
    "admin4@gmail.com",
    "admin5@gmail.com",
];

const admin = all_admin.join(","); 

router.post("/" , async(req , res) =>{
    try{
       
        
        const product = await Product.create(req.body);

        sendMail(
            "me@gmail.com",
            `${req.body.email}`,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            `Hi ${req.body.first_name},  Please confirm your email address`,
            `<h1>Hi ${req.body.first_name},  Please confirm your email address</h1>`,
        ); 

        sendMail(
            "me@gmail.com",
             admin,
             `${req.body.first_name} ${req.body.last_name} has registered with us`,
             `Please welcome ${req.body.first_name} ${req.body.last_name}`,
             `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`,

        );

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