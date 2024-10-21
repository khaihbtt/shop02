import express from 'express';
import dotenv from "dotenv";
import productRouter from './routes/product.routes.js'
import { connect } from './config/db.js';
dotenv.config();

const app = express();

//! Middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/products', productRouter);
app.get('/', (req,res) => {
    return res.json({msg: 'Success!'})
})
console.log(process.env.MONGO_URI)


const start = async () => {
    try {
        await  connect(process.env.MONGO_URI);
        app.listen(8000, () => {
            console.log("Server started at http://localhost:8000");
        })
    } catch (error) {
        console.log(error);
        
    }
}

start()
 

// tk mgDB : khaipkka4
// mk mgDB: zSZdIs7CTepKD8BF