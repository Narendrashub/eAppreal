import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { dbConfig } from '../config/dbConfig.js'

dbConfig()
  

let app=express() 

app.get("/",(req,res)=>{
    res.send("eapparel")
})

export default app