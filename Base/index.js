import { baserouter } from "./Routes/BaseRoute.js";
import express from "express";
import cors from 'cors'


const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials:true
}))
app.use(express.json())
//transform to json format 
app.use("/server",baserouter)


app.listen(3600, () => {
    console.log("We started our server")
})