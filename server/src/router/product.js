const router = require('express').Router()
const ProductController = require('../controllers/product.controller')
const { authorization } = require('../middlewares')
const uploadCloud = require('../configs/cloudinary.config')

router.get('/', ProductController.getProducts)

router.delete('/:id', authorization, ProductController.delete)

router.post('/create', authorization, uploadCloud.fields([
    {name:'product_thumb', maxCount:1},
    {name:'product_images', maxCount:6}
]),ProductController.create)

router.get('/draft/all', authorization, ProductController.findAllDraftForShop)

router.get('/published/all', authorization, ProductController.findAllPublishedForShop)

router.patch('/publish/:id', authorization, ProductController.publishProductByShop)

router.patch('/unpublish/:id', authorization, ProductController.unPublishProductByShop)

router.get('/detail/:id', ProductController.getDetailProduct)

router.get('/search', ProductController.search)

router.get('/similar/:id', ProductController.getSimilarProduct)


module.exports = router
