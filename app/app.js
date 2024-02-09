import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { dbConfig } from '../config/dbConfig.js'
import productRouter from '../routes/productRoutes.js'
import userRouter from '../routes/userRoutes.js'
import { globalErrorHandler } from '../middlewares/globalErrorHandler.js'
import categoryRouter from '../routes/categoryRoutes.js'
import brandRoutes from '../routes/brandRoutes.js'

dbConfig()
  

let app=express() 
//using middlewares
app.use(express.json())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/brand",brandRoutes)

//not found route

app.all("*",(req,res,next)=>{
    const err=new Error(`path${req.originalUrl} is not found`)
    err.status=404;
    next(err)
})

app.use(globalErrorHandler)

export default app