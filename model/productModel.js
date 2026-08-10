const mongoose=require ("mongoose")

const productSchema=new mongoose.Schema({
     title: String,
    brand: String,
    category: String,
    type: String,
    description:String,
    price:String,
    discount: String,
    size: String,
    sku: String,
    image: String
});
const product=mongoose.model("product",productSchema);



module.exports =product;