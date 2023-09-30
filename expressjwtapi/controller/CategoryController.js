const { connect , sequelise } = require("../dbconfig");
const { objectCleaner } = require("../helpers/objectHelper");
const { Category } = require("../models/category");
const { Product } = require("../models/product");
exports.CategoryController = {
 async create(req,res)
 {
    await connect();
    const category = await Category.create({
        name : req.body.name
    })
    debugger
    if(category)
    res.send({message :"Basariyla category eklendi",category})
    else
    res.status(404).json({errors: {msg : "Category girilirken hata oluştu"}});
 },
 //GET ALL
 async getCategory(req,res)
 {
    const category = await Category.findAll({
        where : {
            categoryID : req.params.id
        }
    })
    if(!category){
        res.status(404).json({errors: {msg : "Category girilirken hata oluştu"}});
    }
    else {
        try {
            const kategoriUrun = await Product.findAll({
              where : {
                categoryCategoryID: req.params.id
              } 
            });
            res.send(kategoriUrun)
        }catch(error){
            res.send("Categoryler getirilemedi");
        }
    }

      
   
     
  }
};//son