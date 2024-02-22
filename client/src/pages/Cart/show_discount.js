import { memo, useState } from 'react'
import classnames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTicket} from '@fortawesome/free-solid-svg-icons'
import Model, {ModelContent} from '../../components/Model'

import styles from './Cart.module.scss'

const cx = classnames.bind(styles)

function ShowDiscountOfShop() {

    const [showModel, setShowModel] = useState(false)

    const handleShowModelDiscount = () => {
        setShowModel(true)
    }

    const handleCloseModelDiscount = () => {
        setShowModel(false)
    }

    return ( 
        <div className={cx('section__item')}>
            <FontAwesomeIcon icon={faTicket} />
            <span>Voucher của Shop</span>
            <p className={cx('section__item__option')} onClick={handleShowModelDiscount}>Xem</p>
            {showModel && (
                <Model>
                    <ModelContent className={cx('model_discount_of_shop')} title='LEMON Discount' onClose={handleCloseModelDiscount}>
                        <div className={cx('model_discount_of_shop__content')}>

                        </div>
                    </ModelContent>
                </Model>
            )}
        </div>
     );
}

export default memo(ShowDiscountOfShop);