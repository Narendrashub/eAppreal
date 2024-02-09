import expressAsyncHandler from "express-async-handler"
import Product from "../models/Product.js"

//@desc     Create Prodcut
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct=expressAsyncHandler(async (req,res)=>{
    {
        const {name,description,brand,category,sizes,colors,price,totalQty}=req.body
        const existingProduct=await Product.findOne({name:name})
        if(existingProduct){
            return res.json({
                message:"product exists already",
            })  
        }
        const newproduct=await Product.create({
            name,description,brand,category,sizes,colors,price,totalQty,user:req.userId
        }) 

        //push product into category
        categoryfound.products.push(newproduct._id)
        //resave
        await categoryfound.save()
        res.status(201).json({
            status:"success",
            message:"product created",
            product
        })
    } 
})


//@desc     Get Products
//@path     /api/v1/products
//@access   Public

export const getProducts=expressAsyncHandler(async (req,res)=>{
     {
        //query object
        let productQuery=Product.find()
        //based on name
        if(req.query.name){
            productQuery=productQuery.find({name:{$regex:req.query.name,$options:"i"}})
        }
        //based on color
        if(req.query.colors){
            productQuery=productQuery.find({colors:req.query.colors})
        }
        //filter by category
       if (req.query.category) {
       productQuery = productQuery.find({
     category: { $regex: req.query.category, $options: 'i' },
    });
       }
       //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    });
  }
   // //filter by size
   if(req.query.sizes){
    let query; 
    req.query.sizes.includes(",")?query=req.query.sizes.spilt(","):query=[req.query.sizes]
    console.log(query);
    productQuery=productQuery.find({sizes:{$all:query}})
   }


  //filter by price range
   if (req.query.price) {
    let range = req.query.price.split(',');
    console.log(range);
    productQuery = productQuery.find({
      price: { $gte:+range[0], $lte:+range[1] }});
  }

  //filter by category
    if(req.query.category){
        productQuery=productQuery.find({category:req.query.category})
    }

    //filter by brand
    if(req.query.brand){
        productQuery=productQuery.find({brand:req.query.brand})
    }

    //filter by colors
    if(req.query.colors){
        productQuery=productQuery.find({colors:req.query.colors})
    }

    //pagination
    const page=req.query.page?parseInt(req.query.page):1
    const limit=req.query.limit?parseInt(req.query.limit):3

    let startIndex=(page-1)*limit
    let endIndex=limit

    productQuery=productQuery.skip(startIndex).limit(endIndex)
    //defining previous and next pages
    let noOfDocuments=await Product.countDocuments()
    let pagination={}
    if(startIndex>0){
    pagination.previous=page-1
    }
    if(startIndex<noOfDocuments){
        pagination.next=page+1
    }


        //getting results by resolving query object
        let products= await productQuery;
        res.status(200).json({
            status:"success",
            message:"products fetched successfully",
            products,
            count:products.length
        })
    } 
})

//@desc     Get Product
//@path     /api/v1/products/:id
//@access   Public

export const getProduct=expressAsyncHandler(async (req,res)=>{
    {
        const product=await Product.findById(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product fetched successfully",
            product
        })
    } 
})


//@desc     Update Product
//@path     /api/v1/products/:id
//@access   Private/Admin

export const updateProduct=expressAsyncHandler(async (req,res)=>{
     {
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:"success",
            message:"product updated successfully",
            updatedProduct
        })
    } 
})

//@desc     Delete Product
//@path     /api/v1/products/:id
//@access   Private/Admin

export const deleteProduct=expressAsyncHandler(async (req,res)=>{
     {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product deleted successfully"
        })
    } 
})