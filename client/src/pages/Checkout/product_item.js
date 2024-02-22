import { memo, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStore, faTicket } from '@fortawesome/free-solid-svg-icons'

import styles from './Checkout.module.scss'
import Loading from "../../components/Loading";
import Model, { ModelContent } from "../../components/Model";
import { getDiscountValidOfShop } from '../../redux/requestService/discount.request'
import { checkoutReview } from '../../redux/requestService/checkout.request'
import { loginSuccess } from "../../redux/authSlice";
import { normalizeNumber, chuyenDoiThoiGian, convertNumberToShortString, createAxios, formatDataProductCheckout } from '../../utils'

const cx = classNames.bind(styles)


function ProductItem({shop}) {

    const user = useSelector(state => state.auth.current_user)
    const cartState = useSelector(state => state.cart.my_cart)
    const productOrder = useSelector(state => state.cart.products_ordered)           
    const discountsValidOfShopState = useSelector(state => state.discount.getDiscountValidOfShop)

    const [showModelDiscount, setShowModelDiscount] = useState(false)
    const [discountSelected, setDiscountSelected] = useState({})

    
    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)
    const orderd_cart = formatDataProductCheckout(useRef(productOrder.products).current, cartState.cart?._id, discountSelected)

    const handleChooseDiscountOfShop = (shop) => {
        const body = {
            product_userId:shop.product_userId,
            product_ids: () => {
                return shop.products.map(product => product.product_id)
            }
        }
        setShowModelDiscount(true)
        getDiscountValidOfShop(body, dispatch)
    }

    const handleCloseModelChooseDiscount = () => {
        setShowModelDiscount(false)
    }

    const handleChangeChooseDiscounts = (discount) => {
        setDiscountSelected(discount)
    }


    const handleChooseDiscount = () => {
        if(!discountSelected) {
            alert('Bạn chưa chọn mã giảm giá')
            return
        }
        setShowModelDiscount(false)
        checkoutReview(axiosInstance, user?._id, user?.access_token, orderd_cart, dispatch)
    }

    return (
        <>
            <div className={cx('section', 'product_payment')}>
                <div className={cx('product_payment__header')}>
                    <h3>Sản phẩm</h3>
                    <div className={cx('product_payment__header_sub')}>
                        <p>Đơn giá</p>
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                    </div>
                </div>
                {shop.products && shop.products.map((product,index) => {
                    return (
                        <div className={cx('product_payment__item')} key={index}>
                            <div className={cx('product_payment__item_left')}>
                                <div className={cx('product__item__img')}>
                                    <img src={product?.product_thumb} alt="img_product"/>
                                </div>
                                <p className={cx('product__item__name')}>{product?.product_name}</p>
                            </div>
                            <div className={cx('product_payment__item_right')}>
                                <p>{normalizeNumber(product?.product_price)}₫</p>
                                <p>{product?.quantity}</p>
                                <p>{normalizeNumber(product?.product_price * product?.quantity)}₫</p>
                            </div>
                        </div> 
                    )
                })}
                <div className={cx('shop_name')}>
                    <div className={cx('shop_name_item')}>
                        <FontAwesomeIcon icon={faStore} />
                        <p>LEO HOME</p>
                    </div>
                    <div className={cx('shop_name_item','chat-with-shop')}>
                        <FontAwesomeIcon icon={faMessage} />
                        <p>Chat ngay</p>
                    </div>
                </div>
                <div className={cx('apply_voucher')}>
                    <div>
                        <FontAwesomeIcon icon={faTicket} />
                        <p>Voucher của shop</p>
                    </div>
                    <p onClick={() => handleChooseDiscountOfShop(shop)}>Chọn Voucher</p>
                </div>
            </div>
            {showModelDiscount && (
                <Model>
                    <ModelContent className={cx('model_choose_discount')} title='LEMON Voucher' onClose={handleCloseModelChooseDiscount}>
                        <div className={cx('model_choose_discount__content')}>
                            {discountsValidOfShopState.isFetching && <Loading />}
                            {!discountsValidOfShopState.isFetching && discountsValidOfShopState.discounts && discountsValidOfShopState.discounts.map((discount, index) => {
                                return (
                                    <div className={cx('model_choose_discount__item')} key={index}>
                                        <div className={cx('model_choose_discount__img')}>
                                            <div className={cx('model_choose_discount__img_inner')}>
                                                {convertNumberToShortString(discount.discount_value)}
                                                {discount.discount_type === 'percent_amount' && '%'}
                                            </div>
                                        </div>
                                        <div className={cx('model_choose_discount__info')}>
                                            <p>
                                                Giảm {normalizeNumber(discount.discount_value)}
                                                {discount.discount_type === 'percent_amount' ? '%' : 'đ'}
                                            </p>
                                            <p>Đơn tối thiểu {normalizeNumber(discount.discount_min_order_value)}đ</p>
                                            <p>HSD {chuyenDoiThoiGian(discount.discount_end_day)}</p>
                                        </div>
                                        <input type="radio" checked={discountSelected?._id === discount._id} onChange={() => handleChangeChooseDiscounts(discount)}/>
                                        {/* {totalPriceOfProduct < discount.discount_min_order_value && <p className={cx('warn_mes_discount')}>Mua thêm {convertNumberToShortString(discount.discount_min_order_value - totalPriceOfProduct)} để sử dụng Voucher</p>} */}
                                    </div>
                                )
                            })}
                            <p className={cx('btn-submit-apply-discount')} onClick={handleChooseDiscount}>Áp dụng</p>
                        </div>
                    </ModelContent>
                </Model>
            )}
        </>
    );
}

export default memo(ProductItem);