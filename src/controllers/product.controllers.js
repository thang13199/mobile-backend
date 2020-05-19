const jwt = require("jsonwebtoken");

const productModels = require("../models/products.models");
const responseUtil = require("../utils/response.utils");

async function createProduct(req, res) {
    const {
        productline_id,
        description,
        name
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");
        if (description.length < 8)
            throw new Error("description greater than 8 characters");

        await productModels.createProduct(name,id,productline_id,description);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductLines(req, res) {

    try {
        const [productLines] = await productModels.getProductlines();

        res.json(responseUtil.success({data: {productLines}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductbyShopid(req, res) {
    const {
        shopid
    } = req.query;
    try {
        if (!shopid)
            throw new Error("missing shopid");

        const [rows] = await productModels.getProductByOwnerId(shopid);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductInMyshop(req, res) {
    const {id}=req.tokenData;
    try {
        const [rows] = await productModels.getProductByOwnerId(id);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductDetailByProductId(req, res) {
    const {
        product_id
    } = req.query;
    try {
        const [rows] = await productModels.getProductDetailByProductId(product_id);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function createProductDetails(req, res) {
    const {
        product_id,
        imgUrl,
        classification,
        stock,
        price,
        saleprice
    } = req.body;
    try {

        if (classification.length < 8)
            throw new Error("classification greater than 8 characters");
        if (!product_id)
            throw new Error("missing");
        if (!imgUrl)
            throw new Error("missing");
        if (!stock)
            throw new Error("missing");
        if (!price)
            throw new Error("cmissing");
        if (!saleprice)
            throw new Error("classification greater than 8 characters");
        await productModels.createProductDetail(product_id, imgUrl, classification, stock, price, saleprice);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}



module.exports = {
    createProduct,
    getProductLines,
    getProductbyShopid,
    getProductInMyshop,
    createProductDetails,
    getProductDetailByProductId
}