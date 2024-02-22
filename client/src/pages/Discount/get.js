import { memo, useEffect, useState } from "react";
import classnames from "classnames/bind";
import {useDispatch, useSelector} from 'react-redux'

import styles from './Discount.module.scss'
import Loading from '../../components/Loading'
import { loginSuccess } from "../../redux/authSlice";
import Model,{ ModelContent } from '../../components/Model'
import { createAxios, normalizeNumber, chuyenDoiThoiGian } from '../../utils'
import { getYourShopDiscountCreated, deleteDiscount} from '../../redux/requestService/discount.request'

const cx = classnames.bind(styles)

function GetDiscount() {

    const yourDiscountCreatedState = useSelector(state => state.discount.get_yourShop_discount_created)
    const deleteDiscountState = useSelector(state => state.discount.delete_discount)
    const user = useSelector(state => state.auth.current_user)

    const [showModelDeleteDiscount, setShowModelDeleteDiscount] = useState(false)

    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const handleShowModelDeleteDiscount = () => {
        setShowModelDeleteDiscount(true)
    }
    const handleCloseModelDeleteDiscount = () => {
        setShowModelDeleteDiscount(false)
    }

    const handleDeleteDiscount = (discount_id) => {
        deleteDiscount(axiosInstance, user._id, user.access_token, discount_id, dispatch)
        setShowModelDeleteDiscount(false)
    }

    useEffect(() => {
        getYourShopDiscountCreated(axiosInstance, user._id, user.access_token, dispatch)
    },[deleteDiscountState.discount])

    return ( 
        <div className={cx('get')}>
            {yourDiscountCreatedState.isFetching && <Loading />}
            {!yourDiscountCreatedState.isFetching && yourDiscountCreatedState.discounts && yourDiscountCreatedState.discounts.map((item, index) => {
                return (
                    <div className={cx('discount__item')} key={index}>
                        <div className={cx('discount__content')}>
                            <div className={cx('discount__value-box')}>
                                {item.discount_type === 'fixed_amount' && <div className={cx('discount__value')}>-{normalizeNumber(item.discount_value)}đ</div>}
                                {item.discount_type === 'percent_amount' && <div className={cx('discount__value')}>-{item.discount_value}%</div>}
                            </div>
                            <div className={cx('discount__info')}>
                                    <p className={cx('discount__name')}>Tên chương trình: <span>{item.discount_name}</span></p>
                                    <p className={cx('discount__code')}>Mã: <span>{item.discount_code}</span></p>
                                    <p className={cx('discount__used')}>Đã được sử dụng: <span>{item.discount_users_used.length}</span></p>
                                    <p className={cx('discount__min_order')}>Giá trị đơn hàng tối thiểu để áp mã: <span>{normalizeNumber(item.discount_min_order_value)}đ</span></p>
                                    <p>Hạn sử dụng: từ <span>{chuyenDoiThoiGian(item.discount_start_day)}</span> đến <span>{chuyenDoiThoiGian(item.discount_end_day)}</span></p>
                            </div>
                        </div>
                        <div className={cx('discount__btns')}>
                            <span onClick={handleShowModelDeleteDiscount}>Xóa</span>
                            <span className={cx('discount__btns__active')}>Sửa</span>
                            {showModelDeleteDiscount && (
                                <Model>
                                    <ModelContent onClose={handleCloseModelDeleteDiscount} className={cx('model_confirm_delete_discount')} title='Bạn có chắc muốn xóa mã giảm giá này!'>
                                        <div className={cx('model_confirm_delete_discount__content')}>
                                            <span onClick={handleCloseModelDeleteDiscount}>Hủy bỏ</span>
                                            <span onClick={() => handleDeleteDiscount(item._id)}>Xóa</span>
                                        </div>
                                    </ModelContent>
                                </Model>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
     );
}

export default memo(GetDiscount);