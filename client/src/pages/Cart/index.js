import { useEffect } from "react";
import classNames from "classnames/bind";
import {useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faStore, faTicket, faTruckFast } from '@fortawesome/free-solid-svg-icons'

import styles from './Cart.module.scss'
import { loginSuccess } from "../../redux/authSlice";
import { getMyCart } from '../../redux/requestService/cart.request'
import { createAxios } from '../../utils'
import Loading from '../../components/Loading'
import CartItem from "./product_item";
import TotalOrderPrice from "./totalOrder";
import ShowDiscountOfShop from "./show_discount";

const cx = classNames.bind(styles)

function Cart() {

    const user = useSelector(state => state.auth.current_user)
    const { cart, isFetching } = useSelector(state => state.cart.my_cart)
    const deleteProductofCartState = useSelector(state => state.cart.deleteProduct)

    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    useEffect(() => {
        getMyCart(axiosInstance, user?._id, user?.access_token, dispatch)
    },[deleteProductofCartState.product, dispatch])
 
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {isFetching && <Loading />}
                <div className={cx('section','header')}>
                    <p className={cx('header__product')}>{`Sản phẩm (${cart?.cart_count_product})`}</p>
                    <p className={cx('header__price')}>Đơn giá</p>
                    <p className={cx('header__quantity')}>Số lượng</p>
                    <p className={cx('header__amount')}>Số tiền</p>
                    <p className={cx('header__action')}>Thao tác</p>
                </div>
                {!isFetching && cart && cart.products_cart.map((shop, index) => {
                    return (
                        shop.products.length > 0 && <div className={cx('section', 'cart__item')} key={index}>
                            <div className={cx('cart__item__store')}>
                                <FontAwesomeIcon icon={faStore} />
                                <p>LEMON Shop</p>
                                <FontAwesomeIcon className={cx('send_message_to_store')} icon={faEnvelope} />
                            </div>
                            <div className={cx('section__item','cart__item__products')}>
                                {shop && shop.products.map((product, index) => {
                                    return (
                                        <CartItem product={product} className={cx({wrap: shop.products.length > 0})} key={index}/>
                                    )
                                })}
                            </div>
                            <ShowDiscountOfShop />
                            <div className={cx('section__item')}>
                                <FontAwesomeIcon icon={faTruckFast} />
                                <span>Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫25.000 phí vận chuyển đơn tối thiểu ₫150.000</span>
                                <p className={cx('section__item__option')}>Tìm hiểu thêm</p>
                            </div>
                        </div>
                    )
                })}
                <TotalOrderPrice />
            </div>
        </div>
     );
}

export default Cart;