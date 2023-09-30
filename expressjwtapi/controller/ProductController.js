const { connect , sequelise } = require("../dbconfig");
const { Category } = require("../models/category");
const { Product } = require("../models/product");



exports.ProductController = {
 async create(req,res)
 {
  await connect();
   const category = await Category.findByPk(req.body.catId);
   if(!category){
    res.status(404).json({errors: {msg : "Ürün oluştururken Kategori Bulunamadı."}});
   }
   else{
    const product = await Product.create({
        name : req.body.name,
        price : req.body.price,
        categoryCategoryID : req.body.catId,
        explanation : req.body.explanation,
    })
    debugger
    res.send({message :"Basariyla ürün eklendi.",product})
    }
 },
 //GETALL
 async getAllProduct(req,res)
 { 
  await connect();
       try {
           const urunlerim = await Product.findAll();
           res.send(urunlerim)
       }catch(error){
           res.send("urunler getirilemedi.");
       }
   
     
  }
};//son