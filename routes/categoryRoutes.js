import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoryControllers.js';

//router instance
const categoryRouter=express.Router()


categoryRouter.post("/",isLogged,createCategory)
categoryRouter.get("/",getCategories)
categoryRouter.get("/:id",getCategory)
categoryRouter.put("/:id",isLogged,updateCategory)
categoryRouter.delete("/:id",isLogged,deleteCategory)

export default categoryRouter