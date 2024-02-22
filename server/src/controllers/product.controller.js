const ProductModel = require('../model/product.model')
const { getProducts, createProduct } = require('../model/repo/product.repo')
const { createElectronic } = require('../model/repo/electronic.repo')
const { createClothing } = require('../model/repo/clothing.repo')
const { deleteImageCloudinary } = require('../utils')

class ProductController{

    async create(req, res) {
        try {
            const {product_thumb} = req.files
            const product_images = []
            const { isPublished } = req.body
            
            req.files.product_images && req.files.product_images.forEach(item => {
                product_images.push(item.path)
            })

            const body = {
                ...req.body,
                product_images,
                product_attributes:JSON.parse(req.body.product_attributes),
                product_userId:req.user_id,
                product_thumb:product_thumb[0].path
            }

            if(isPublished){
                body.isDraft = false
                body.isPublished = true
            }

            switch (req.body.product_type) {
                case 'Clothing':{
                    const newProduct = await createProduct(body)
                    if(!newProduct){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo sản phẩm lỗi')
                    }

                    const newClothing = await createClothing({
                        _id:newProduct._id,
                        ...JSON.parse(req.body.product_attributes),
                        product_userId:req.user_id
                    })
                    if(!newClothing){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo clothing lỗi')
                    }

                    return res.status(200).json(newProduct)
                }
                case 'Footwear' :{
                    const newProduct = await ProductModel.create(body)
                    if(!newProduct){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo sản phẩm lỗi')
                    }

                    const newClothing = await createClothing({
                        _id:newProduct._id,
                        ...JSON.parse(req.body.product_attributes),
                        product_userId:req.user_id
                    })
                    if(!newClothing){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo clothing lỗi')
                    }

                    return res.status(200).json(newProduct)
                }
                case 'Electronic':{
                    const newProduct = await createProduct(body)
                    if(!newProduct){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo sản phẩm lỗi')
                    }

                    const newElectronic = await createElectronic({
                        _id:newProduct._id,
                        ...JSON.parse(req.body.product_attributes),
                        product_userId:req.user_id
                    })
                    if(!newElectronic){
                        deleteImageCloudinary(product_thumb, product_images)
                        return res.status(400).json('Tạo electronic lỗi')
                    }

                    return res.status(200).json(newProduct)
                }
                default:
                    return res.status(403).json('Product type không hợp lệ!')
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async findAllDraftForShop(req, res) {
        try {
            const query = {product_userId:req.user_id, isDraft:true}
            const products = await getProducts(query)
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async findAllPublishedForShop(req, res) {
        try {
            const query = {product_userId: req.user_id, isPublished:true}
            const products = await getProducts(query)
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async publishProductByShop(req, res) {
        try {
            const { modifiedCount } = await ProductModel.updateOne({
                product_userId:req.user_id,
                _id:req.params.id,
                isPublished:false,
                isDraft:true
            },{
                $set:{
                    isPublished:true,
                    isDraft:false
                }
            },{new:true})

            if(modifiedCount === 0 || modifiedCount === -1) return res.status(400).json('Publish failed')

            return res.status(200).json('Publish product Successfully')

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async unPublishProductByShop(req, res) {
        try {
            const { modifiedCount } = await ProductModel.updateOne({
                product_userId:req.user_id,
                _id:req.params.id,
                isPublished:true,
                isDraft:false
            },{
                $set:{
                    isPublished:false,
                    isDraft:true
                }
            },{new:true})

            if(modifiedCount === 0 || modifiedCount === -1) return res.status(400).json('Publish failed')

            return res.status(200).json('Publish product Successfully')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async delete(req, res) {
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.id)
            if(product) return res.status(200).json('Delete Successfully')
            
            return res.status(400).json('Delete failed')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async search(req, res) {
        try {
            const regexSearch = new RegExp(req.query.q)
            const results = await ProductModel.find({
                isPublished:true,
                $text:{$search:regexSearch}
            },{score:{$meta:'textScore'}}).lean()

            return res.status(200).json(results)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getProducts(req, res) {
        try {
            const {page, type, giatu, den} = req.query
            
            const query = {
                isPublished:true,
                $and:[{}]
            }

            if(type) query.$and.push({$text:{$search:new RegExp(type, 'i')}})
            if(giatu && den) query.product_price = { $lt: Number(den), $gt:Number(giatu)}

            const products = await getProducts(query, Number(page), 20)
            
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getDetailProduct(req, res) {
        try {
            const product = await ProductModel.findOne({
                isPublished:true,
                _id:req.params.id
            }).lean()

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async updateProduct(req, res) {
        try {
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getSimilarProduct(req, res) {
        try {
            const orgirinalProduct = await ProductModel.findById(req.params.id)
            if(!orgirinalProduct) return res.status(200).json([])

            const similarProducts = await ProductModel.find({
                isPublished:true,
                $text:{$search: orgirinalProduct.product_name},
                $text:{$search: orgirinalProduct.product_description},
                product_type:orgirinalProduct.product_type,
                _id:{$ne: req.params.id},
                'product_attributes.material':{
                    $regex:orgirinalProduct.product_attributes.material, 
                    $options: 'i',
                }
            })

            return res.status(200).json(similarProducts)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new ProductController;
