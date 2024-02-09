import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productContrllers.js';

//router instance
const productRouter=express.Router()


productRouter.post("/",isLogged,createProduct)
productRouter.get("/",isLogged,getProducts)
productRouter.get("/:id",isLogged,getProduct)
productRouter.put("/:id",isLogged,updateProduct)
productRouter.delete("/:id",isLogged,deleteProduct)

export default productRouter