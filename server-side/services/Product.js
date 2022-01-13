const Product = require("../models/Product");

const addProduct = (ProductData) => {
    const product = new Product(ProductData);
    return product.save();
}

const listAllProducts = () => {
    return Product.find({});
}

const findProductByID = (productID) => {
    return Product.findById(productID)
}

const deleteProductByID = (productID) => {
    Product.findByIdAndDelete(productID, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`Product ${productID} deleted.`)
        }
    })
}

const getProductByCategory = (Category) => {
    const response = Product.find({categories : Category.name})
    return response;
}

const findProductByName = (productName) => {
    return Product.findOne({ name: productName })
}

const updateProduct = (filter, update) => {
    return Product.findOneAndUpdate(filter, update, { new: true })
}

const deleteAllProducts = () => {
    return Product.deleteMany({})
}

module.exports = {
    addProduct,
    listAllProducts,
    findProductByID,
    findProductByName,
    deleteProductByID,
    updateProduct,
    deleteAllProducts,
    getProductByCategory
}