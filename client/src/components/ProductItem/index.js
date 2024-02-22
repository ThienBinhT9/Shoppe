import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faHeart, faSearch} from '@fortawesome/free-solid-svg-icons'
import { normalizeNumber } from '../../utils'

import styles from './ProductItem.module.scss'

const cx = classNames.bind(styles)

function ProductItem({item}) {
    return ( 
        <div className={cx('product')}>
            <Link to={`/chi-tiet/${item._id}`} className={cx('product__thumb')}>
                <img src={item.product_thumb} alt="product"/>
            </Link>
            <div className={cx('product__attribute')}>
                <Link to={`/chi-tiet/${item._id}`} className={cx('product__name')}>{item.product_name}</Link>
                <p className={cx('product__price')}>giá <span>{normalizeNumber(item.product_price)}đ</span></p>
            </div>
            <div className={cx('btn-favorite')}>
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={cx('btn-options')}>
                <div className={cx('btn-option')}><FontAwesomeIcon icon={faCartShopping} /></div>
                <div className={cx('btn-option')}><FontAwesomeIcon icon={faSearch} /></div>
            </div>
            <div className={cx('persent-sale')}>
                đang sale
            </div>
        </div>
    );
}

export default ProductItem;