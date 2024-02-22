import { memo, useState } from 'react';
import classnames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';

import styles from './Cart.module.scss'
import { createAxios, normalizeNumber } from '../../utils';
import { deleteProductOfMyCart, updateQuantityProduct } from '../../redux/requestService/cart.request'
import { loginSuccess } from '../../redux/authSlice';
import { productOrderedPull, productOrderedPush } from '../../redux/cartSlice'


const cx = classnames.bind(styles)

function CartItem({ product, className }) {

    const user = useSelector(state => state.auth.current_user)

    const [quantity, setQuantity] = useState(product?.quantity)
    const [checkOrder, setCheckOrder] = useState(false)

    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const handleMinusQuantity = () => {
        if(quantity === 1) return
        
        setQuantity(prev => prev - 1)
        setQuantity(prev => {
            const data = {
                shop_id:product.product_userId,
                product_id:product.product_id,
                quantity:prev,
                old_quantity:quantity
            }

            updateQuantityProduct(axiosInstance, user?._id, user?.access_token, data, dispatch)
            return prev
        })
    }

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1)
        setQuantity(prev => {
            const data = {
                shop_id:product.product_userId,
                product_id:product.product_id,
                quantity:prev,
                old_quantity:quantity
            }

            updateQuantityProduct(axiosInstance, user?._id, user?.access_token, data, dispatch)
            return prev
        })
    }

    const handleDeleteProductOfCart = (product_id) => {
        deleteProductOfMyCart(axiosInstance, user?._id, user?.access_token, product_id, dispatch)
    }

    const handleChangeCheck = () => {
        setCheckOrder(prev => {
            return prev === false ? true : false
        })

        setCheckOrder(prev => {
            if(prev === true) dispatch(productOrderedPush(product))
            if(prev === false) dispatch(productOrderedPull(product))
            return prev
        })
    }

    return ( 
        <div className={cx('item__product', {[className]: className})}>
            <div className={cx('item__product__info')}>
                <input type="checkbox" className={cx('item__product_check')} checked={checkOrder} onChange={handleChangeCheck}/>
                <div className={cx('item__product_thumb')}>
                    <img src={product.product_thumb} alt="cart__item__product"/>
                </div>
                <div className={cx('item__product_desc')}>
                    <p className={cx('item__product_name')}>{product.product_name}</p>
                    <p className={cx('item__product_type')}>{product.product_color},{product.product_size}</p>
                </div>
            </div>
            <p className={cx('item__product__item','item__product__price')}>{normalizeNumber(product.product_price)}₫</p>
            <div className={cx('item__product__item','item__product__quantity')}>
                <div className={cx('item__product__quantity__control')}>
                    <span onClick={handleMinusQuantity}>-</span>
                    <span>{quantity}</span>
                    <span onClick={handleIncreaseQuantity}>+</span>
                </div>
            </div>
            <p className={cx('item__product__item','item__product__amount')}>{normalizeNumber(product.product_price * quantity)}₫</p>
            <p className={cx('item__product__item','item__product__action')} onClick={handleDeleteProductOfCart}>Xóa</p>
        </div>
     );
}

export default memo(CartItem);