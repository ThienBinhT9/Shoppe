import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from './Checkout.module.scss'
import { createAxios, formatDataProductCheckout } from '../../utils'
import { checkoutReview } from '../../redux/requestService/checkout.request'
import { productOrderdData } from '../../redux/cartSlice'
import { loginSuccess } from "../../redux/authSlice";
import ProductItem from "./product_item";
import Payment from "./pay";

const cx = classNames.bind(styles)

function Checkout() {

    const user = useSelector(state => state.auth.current_user)
    const cartState = useSelector(state => state.cart.my_cart)
    const productOrder = useSelector(state => state.cart.products_ordered)           

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const orderd_cart = formatDataProductCheckout(useRef(productOrder.products).current, cartState.cart?._id)

    useEffect(() => {
        checkoutReview(axiosInstance, user?._id, user?.access_token, orderd_cart, dispatch)
    },[])

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
        if(orderd_cart.shop_order_ids.length <= 0){
            navigate('/gio-hang')
        }
        return () => dispatch(productOrderdData([]))
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('section','delivery_address')}>
                    <div className={cx('delivery_address__title')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>Thông tin và địa chỉ đơn hàng</p>
                    </div>
                    <div className={cx('delivery_address__body')}>
                        <p>Tên người nhận: {user?.username}</p>
                        <p>Số điện thoại người nhận: <span>{user?.phone || 'Chưa có'}</span></p>
                        <p>Địa chỉ nhận: <span>{user?.address || 'Chưa có'}</span></p>
                        {(user?.address && user?.phone) ? <button>Thay đổi</button> : <button>Cập nhật</button>}
                    </div>
                </div>
                {orderd_cart.shop_order_ids && orderd_cart.shop_order_ids.map((shop, index) => {
                    return (
                        <ProductItem shop={shop} key={index}/>
                    )
                })}
                <Payment />
            </div>
        </div>
    );
}

export default Checkout;
