import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRouter from './routers/user.router.js'
import itemRouter from './routers/item.route.js'

dotenv.config({})

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true
}));


//routers
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)


const Port = process.env.PORT
app.listen(Port, () => {
    console.log(`Server is Connected in port ${Port}`);
    connectDb();
})
