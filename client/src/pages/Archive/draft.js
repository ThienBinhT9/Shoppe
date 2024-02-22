import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

import styles from './Archive.module.scss'
import { loginSuccess } from "../../redux/authSlice";
import { createAxios, normalizeNumber } from '../../utils'
import Model, { ModelContent } from "../../components/Model";
import { archive, publish, deleteProduct } from '../../redux/requestService/product.request'
import Loading from "../../components/Loading";


const cx = classNames.bind(styles)

function Draft() {

    const user = useSelector(state => state.auth.current_user)
    const archiveState = useSelector(state => state.product.archive)
    const publishState = useSelector(state => state.product.publish)
    const deleteState = useSelector(state => state.product.delete)

    const [showModelDetele, setShowModelDelete] = useState(false)

    const dispatch = useDispatch()
    const axiosInstance = createAxios(user, dispatch, loginSuccess)

    const handleShowModelDelete = () => {
        setShowModelDelete(true)
    }

    const handleCloseModelDelete = () => {
        setShowModelDelete(false)
    }

    const handlePublish = (product_id) => {
        publish(axiosInstance, product_id, user?._id, user?.access_token, dispatch)
    }

    const handleDelete = (product_id) => {
        deleteProduct(axiosInstance, product_id, user._id, user?.access_token, dispatch)
        setShowModelDelete(false)
    }

    useEffect(() => {
        archive(axiosInstance, user?._id, user?.access_token, dispatch)
    },[user?._id, user?.access_token, publishState, deleteState])

    return ( 
        <div className={cx('section','dafts')}>
            {archiveState.isFetching && <Loading />}
            <div className={cx('section__body')}>
                {!archiveState.isFetching && archiveState._products && archiveState._products.map((item, index) => {
                    return (
                        <div className={cx('_product')} key={index}>
                            <div className={cx('_product__content')}>
                                <div className={cx('_product__img')}>
                                    <img src={item.product_thumb} alt="product"/>
                                </div>
                                <div className={cx('_product__info')}>
                                    <p className={cx('_product__name')}>{item.product_name}</p>
                                    <p className={cx('_product__attribute')}>Số lượng: <span>{item.product_quantity}</span></p>
                                    <p className={cx('_product__attribute','_product__price')}>Giá: <span>{normalizeNumber(item.product_price)}đ / đơn</span></p>
                                    
                                </div>
                            </div>
                            <div className={cx('_product__footer')}>
                                <span className={cx('btn','btn-primary')} onClick={() => handlePublish(item._id)}>Công khai</span>
                                <span className={cx('btn')}>Chỉnh sửa</span>
                                <span className={cx('btn')}>Chi tiết</span>
                                <span className={cx('btn','btn-destroy')} onClick={handleShowModelDelete}>Xóa</span>
                                {showModelDetele && (
                                    <Model>
                                        <ModelContent onClose={handleCloseModelDelete} className={cx('model_notify_delete')}>
                                            <div className={cx('model_notify_delete__content')}>
                                                <p>Bạn có chắc muốn xóa sản phẩm này!</p>
                                                <div className={cx('model_notify_delete__btn')}>
                                                    <span className={cx('delete_submit')} onClick={() => handleDelete(item._id)}>Xóa</span>
                                                    <span onClick={handleCloseModelDelete}>Hủy</span>
                                                </div>
                                            </div>
                                        </ModelContent>
                                    </Model>
                                )}
                            </div>
                        </div>
                    )
                })}
                {!archiveState.isFetching && archiveState._products?.length === 0 && (
                    <div className={cx('if_empty-cart')}>
                        <FontAwesomeIcon icon={faBagShopping} />
                        <p>Không có sản phẩm nào</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Draft);