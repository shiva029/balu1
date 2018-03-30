

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Productjs = require('./api/routes/products');
const Ordersjs = require('./api/routes/orders');

console.log("Process.env.Monogo_Atlas_Paass: ", process.env.MONGO_ATLAS_PW);

mongoose.connect(`mongodb://node-shop:shiva12345@node-rest-shop-shard-00-00-4nc01.mongodb.net:27017,node-rest-shop-shard-00-01-4nc01.mongodb.net:27017,node-rest-shop-shard-00-02-4nc01.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin`,{
    useMongoClient:true
});

// mongoose.connect('mongodb://localhost/cart');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-with,Content-Type,Accept,Autherization"
    );
    if(req.method === 'options'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/products',Productjs);
app.use('/orders',Ordersjs)
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'it works'
//     })
// })
app.use('/',(req,res,next)=>{
    const error = new Error('notFound');
    error.status(404);
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message:error.message
        }
    })

})
module.exports = app;