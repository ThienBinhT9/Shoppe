import classNames from "classnames/bind";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useState } from "react";
import { faCartPlus, faChevronRight, faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Detail.module.scss'
import { detail, getSimilarProduct} from '../../redux/requestService/product.request'
import Loading from '../../components/Loading'
import dataShoppingGuide from '../../utils/dataShoppingGuide'
import {createAxios, normalizeNumber} from '../../utils'
import Model, { ModelContent } from '../../components/Model'
import ProductItem from '../../components/ProductItem'
import Images from "./images";
import { getDiscountValidOfShop } from '../../redux/requestService/discount.request'
import { addProductToCart } from '../../redux/requestService/cart.request'
import { loginSuccess } from "../../redux/authSlice";
import { productOrderdData } from '../../redux/cartSlice'


const cx = classNames.bind(styles)

function Detail() {

    const {product_id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { _product, isFetching } = useSelector(state => state.product.detail)
    const user = useSelector(state => state.auth.current_user)
    const validDiscountState = useSelector(state => state.discount.getValidDiscount)
    const discountsValidOfShopState = useSelector(state => state.discount.getDiscountValidOfShop)
    const similarState = useSelector(state => state.product.similar)

    const [showDescOrGuide, setShowDescOrGuide] = useState('desc')
    const [showModelDiscount, setShowModelDiscount] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')

    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const handlePlusQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const handleMinusQuantity = () => {
        setQuantity(prev => {
            if(prev <= 1) return 1
            return prev - 1
        })
    }

    const handleShowOrCloseModelDiscount = () => {
        setShowModelDiscount(prev => prev === false ? true : false)
    }

    const handleAddToCart = () => {
        if(!color || !size){
            alert('Bạn hãy chọn màu sắc và kích thước xong rồi hãy thêm vào giỏ nhé!')
            return 
        }

        const data = {
            quantity,
            product_id,
            product_size:size,
            product_color:color,
            product_name:_product.product_name,
            product_thumb:_product.product_thumb,
            product_price:_product.product_price,
            product_userId:_product.product_userId,
        }

        addProductToCart(axiosInstance, user._id, user.access_token, data, dispatch)
        alert('Thêm vào giỏ hàng thành công!')
    }

    const handlePaynow = () => {
        if(!color || !size){
            alert('Bạn hãy chọn màu sắc và kích thước xong rồi hãy thêm vào giỏ nhé!')
            return 
        }
        if(!user){
            navigate('/dang-nhap')
            return 
        }else{
            navigate(`/xu-ly-thanh-toan`)
            dispatch(productOrderdData([{
                quantity,
                product_id,
                product_size:size,
                product_color:color,
                product_name:_product.product_name,
                product_thumb:_product.product_thumb,
                product_price:_product.product_price,
                product_userId:_product.product_userId,
            }]))
            return 
        }
    }

    useEffect(() => {
        detail(product_id, dispatch)
        getSimilarProduct(product_id, dispatch)
        getDiscountValidOfShop({product_userId:_product?.product_userId, product_ids:[product_id]}, dispatch)
    },[product_id, dispatch])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-6', 'm-12')}>
                        <Images product={_product} isFetching={isFetching}/>
                    </div>
                    <div className={cx('col', 'l-6', 'm-12')}>
                        <div className={cx('product__info')}>
                            {isFetching && <Loading />}
                            <h1 className={cx('product__name')}>{_product?.product_name}</h1>
                            <div className={cx('product_thumb-break')}>
                                <p>Thương hiệu: <span>{_product?.product_attributes.brand}</span></p>
                                <p>Tình trạng: <span>Còn hàng</span></p>
                            </div>
                            <div className={cx('product__price')}>
                                <div className={cx('product__count')}>
                                    <h1 className={cx('product__price__new')}>{normalizeNumber(Number(_product?.product_price))}₫</h1>
                                    <p className={cx('product__price__old')}>7.000.000₫</p>
                                </div>
                                <p className={cx('product__saving')}>Tiết kiệm: <span>810.000₫</span></p>
                            </div>
                            <div className={cx('product__section')}>
                                <p className={cx('product__section__title')}>Chọn màu sắc:</p>
                                <div className={cx('product__section__content')}>
                                    {_product && _product?.product_attributes.color.map((item, index) => {
                                        return  <div key={index} className={cx('product__section__item',{active:item === color})} onClick={() => setColor(item)} >#{item}</div>
                                    })}
                                </div>
                            </div>
                            <div className={cx('product__section')}>
                                <p className={cx('product__section__title')}>Chọn kích cỡ: </p>
                                <div className={cx('product__section__content')}>
                                    {_product && _product?.product_attributes.size.map((item, index) => {
                                        return  <div key={index} className={cx('product__section__item',{active:item === size})} onClick={() => setSize(item)}>{item}</div>
                                    })}
                                </div>
                            </div>
                            <div className={cx('product__discount')}>
                                <p className={cx('product__discount__title')}>Các mã giảm giá có thể áp dụng:</p>
                                <div className={cx('product__discount__content')}>
                                    {discountsValidOfShopState.discounts && discountsValidOfShopState.discounts.map((discount, index) => {
                                        return (
                                            <div key={index} className={cx('product__discount__content__box')}><div className={cx('product__discount__item')} onClick={handleShowOrCloseModelDiscount}>{discount.discount_code}</div></div>
                                        )
                                    })}
                                    <FontAwesomeIcon className={cx('loadmore-discount')} icon={faChevronRight} onClick={handleShowOrCloseModelDiscount}/>
                                    {showModelDiscount && (
                                        <Model>
                                            <ModelContent onClose={handleShowOrCloseModelDiscount} title='MÃ KHUYẾN MÃI' className={cx('model-list-discount')}>
                                                <div className={cx('model-list-discount__content')}>
                                                {validDiscountState.discounts && validDiscountState.discounts.map((discount, index) => {
                                                    return (
                                                        <div className={cx('model-item-discount')} key={index}>
                                                            {discount.discount_type === 'fixed_amount' && <p className={cx('model-item-discount__price')}>-{discount.discount_value}đ</p>}
                                                            {discount.discount_type === 'percent_amount' && <p className={cx('model-item-discount__price')}>-{discount.discount_value}%</p>}
                                                            <div className={cx('model-item-discount__content')}>
                                                                <div className={cx('model-item-discount__info')}>
                                                                    <p className={cx('model-item-discount__name')}>Mã giảm giá <span>{discount.discount_code}</span></p>
                                                                    <p className={cx('model-item-discount__condition')}>Điều kiện: <span>Nhập mã {discount.discount_code} giảm {discount.discount_value}đ đơn từ {discount.discount_min_order_value}đ</span></p>
                                                                </div>
                                                                <p className={cx('model-item-discount__copy')}>
                                                                    <span>Sao chép</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                </div>
                                            </ModelContent>
                                        </Model>
                                    )}
                                </div>
                            </div>
                            <div className={cx('product__quantity')}>
                                Số lượng:
                                <div className={cx('product__quantity__control')}>
                                    <div className={cx('product__quantity__btn')} onClick={handleMinusQuantity}><FontAwesomeIcon icon={faMinus}/></div>
                                    <span className={cx('product__quantity__text')}>{quantity}</span>
                                    <div className={cx('product__quantity__btn')} onClick={handlePlusQuantity}><FontAwesomeIcon icon={faPlus}/></div>
                                </div>
                            </div>
                            <div className={cx('btn-pay-now')} onClick={handlePaynow}>
                                <div>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Mua ngay
                                </div>
                                <p>Giao hàng tận nơi hoặc nhận tại cửa hàng</p>
                            </div>
                            <div className={cx('btn-other')}>
                                <div className={cx('btn-add-cart')} onClick={handleAddToCart}>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    Thêm vào giỏ hàng
                                </div>
                                <div className={cx('btn-add-cart')}>
                                    <FontAwesomeIcon icon={faFacebookMessenger} />
                                    Tư vấn chọn hàng
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col', 'l-9', 'm-12')}>
                        <div className={cx('product__descriptions-and-shoppingGuide')}>
                            <div className={cx('product__descriptions__header')}>
                                <p className={cx({active:showDescOrGuide === 'desc'})} onClick={() => setShowDescOrGuide('desc')}>Mô tả sản phẩm</p>
                                <p className={cx({active:showDescOrGuide === 'guide'})} onClick={() => setShowDescOrGuide('guide')}>Hướng dẫn mua hàng</p>
                            </div>
                            {showDescOrGuide === 'desc' && (
                                <div className={cx('product__descriptions__content')}>    
                                    <div className={cx('product__descriptions__img')}>
                                        <img src={_product?.product_thumb} alt="product__thumb"/>
                                    </div>
                                    <p className={cx('product__description')}>{_product?.product_description}</p>
                                </div>
                            )}
                            {showDescOrGuide === 'guide' && (
                                <div className={cx('product__shoppingGuide__content')}>
                                    {dataShoppingGuide.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p className={cx('product__shoppingGuide__step')}><span>Bước {item.step}: </span>{item.step_title}</p>
                                                {item.desc && item.desc.map((_item, _index) => {
                                                    return <p className={cx('product__shoppingGuide__desc')} key={_index}>{_item}</p>
                                                }) }
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('col', 'l-9', 'm-12')}>
                        <div className={cx('product__access')}>
                            <p className={cx('product__access__title')}>Đánh giá của khách hàng</p>
                            <div className={cx('product__access__content')}>

                            </div>
                        </div>
                    </div>
                    <div className={cx('col','l-12')}>
                        <div className={cx('product__similar')}>
                            <p className={cx('product__similar__title')}>Sản phẩm liên quan</p>
                            <div className={cx('product__similar__body')}>
                                {similarState.isFetching && <Loading />}
                                <div className={cx('row')}>
                                    <div className={cx('col','l-3','m-4','s-6')}>
                                        {!similarState.isFetching && similarState._products && similarState._products.map((item, index) => {
                                            return <ProductItem key={index} item={item}/>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default memo(Detail);