import { memo } from 'react';
import classnames from 'classnames/bind'
import { useSelector } from "react-redux";


import styles from './Checkout.module.scss'
import { normalizeNumber } from '../../utils'
import Loading from "../../components/Loading";

const cx = classnames.bind(styles)

function Payment() {

    const checkoutReviewState = useSelector(state => state.checkout.reviewCheckout)     

    return ( 
        <div className={cx('section', 'checkout')}>
            <div className={cx('checkout__header')}>
                <h3>Phương thức thanh toán</h3>
                <div className={cx('checkout__header__sub')}>
                    <span>Thanh toán khi nhận hàng</span>
                    <p>THAY ĐỔI</p>
                </div>
            </div>
            <div className={cx('checkout__body')}>
                {checkoutReviewState.isFetching && <Loading />}
                {!checkoutReviewState.isFetching && (
                    <div>
                        <p className={cx('checkout__item')}>Tổng tiền hàng <span>{normalizeNumber(checkoutReviewState.checkout?.totalOrder)}đ</span></p>
                        <p className={cx('checkout__item')}>Phí vận chuyển <span>0đ</span></p>
                        <p className={cx('checkout__item')}>Áp mã giảm giá <span>-{normalizeNumber(checkoutReviewState.checkout?.discount_amount)}đ</span></p>
                        <p className={cx('checkout__item')}>Tổng thanh toán: <span className={cx('totle_price')}>{normalizeNumber(checkoutReviewState.checkout?.totalPrice)}đ</span></p>
                    </div>
                )}
            </div>
            <div className={cx('checkout__submit')}>
                <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span>Điều khoản Shopping Garden</span></p>
                <button>Đặt hàng</button>
            </div>
        </div>
    );
}

export default memo(Payment);