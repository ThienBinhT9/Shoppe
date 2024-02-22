import { memo, useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {faTicket} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.scss'
import { productOrderdData } from '../../redux/cartSlice'
import { normalizeNumber, totalPriceOrderd } from "../../utils";

const cx = classNames.bind(styles)

function TotalOrderPrice() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productOrder = useSelector(state => state.cart.products_ordered)

    const handleToCheckout = () => {
        if(productOrder.products.length === 0){
            alert('Bạn chưa chọn sản phẩm nào!')
            return
        }

        navigate('/xu-ly-thanh-toan')
        return 
    }

    useEffect(() => {
        return () => dispatch(productOrderdData([]))
    },[])

    return ( 
        <div className={cx('section', 'cart__statistical')}>
            <div className={cx('admin_voucher')}>
                <div>
                    <FontAwesomeIcon icon={faTicket} />
                    <span>Shopping Garden Voucher</span>
                </div>
                <p>Chọn mã</p>
            </div>
            <div className={cx('section__item','cart__submit')}>
                <p className={cx('total__price')}>{`Tổng thanh toán (${productOrder?.products.length || 0} sản phẩm): `}<span>{normalizeNumber(totalPriceOrderd(productOrder.products || 0))}đ</span></p>
                <p className={cx('cart__submit__btn')} onClick={handleToCheckout}>Mua hàng</p>
            </div>
        </div>
     );
}

export default memo(TotalOrderPrice);