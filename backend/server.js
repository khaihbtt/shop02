import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get('/products', (req, res) => {});
console.log(process.env.MONGO_URI)

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
}) 

// tk mgDB : khaipkka4
// mk mgDB: zSZdIs7CTepKD8BF