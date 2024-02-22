import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'
import { dataPrice } from '../../utils/dataCategoryProduct'
import { Link, NavLink } from 'react-router-dom'

import styles from './Products.module.scss'

const cx = classNames.bind(styles)

function Navigate({setPriceSelect}) {
 
    const [showSubClothing, setShowSubClothing] = useState(false)
    const [showSubElectronic, setShowSubElectronic] = useState(false)
    const [checked, setChecked] = useState(false)

    const priceSelect = useRef({})

    const handleShowClothingSub = (e) => {
        setShowSubClothing(prev => prev === false ? true : false)
        e.preventDefault()
    }

    const handleSelectPrice = (item, index) => {
        setChecked(prev => {
            if(prev === index){
                priceSelect.current = {}
                return false
            }
            priceSelect.current = item
            return index
        })
    }

    useEffect(() => {
        setPriceSelect(priceSelect.current)
    },[priceSelect.current.display])

    return ( 
        <div className={cx('navigation')}>
            <div className={cx('section', 'cate')}>
                <h1 className={cx('section__title')}>DANH MỤC SẢN PHẨM</h1>
                <div className={cx('section__content')}>
                    <Link className={cx('section__item')} to={`/san-pham/quan-ao`}>
                        <div className={cx('section__item__display')}>
                            Quần áo
                            {!showSubClothing && <FontAwesomeIcon className={cx('section__item__icon')} icon={faChevronDown} onClick={handleShowClothingSub}/>}
                            {showSubClothing&& <FontAwesomeIcon className={cx('section__item__icon')} icon={faChevronUp} onClick={handleShowClothingSub}/>}
                        </div>
                        {showSubClothing && (
                            <div className={cx('section__item__sub')}>
                                <NavLink className={cx('section__item__sub__item')} to={`/san-pham/ao`}>Áo</NavLink>
                                <NavLink className={cx('section__item__sub__item')} to={`/san-pham/quan`}>Quần</NavLink>
                                <NavLink className={cx('section__item__sub__item')} to={`/san-pham/giay`}>Giày & Dép</NavLink>
                                <NavLink className={cx('section__item__sub__item')} to={`/san-pham/mu`}>Mũ</NavLink>
                            </div>
                        )}
                    </Link>
                    <Link className={cx('section__item')} to='/san-pham/do-dien-tu'>
                        <div className={cx('section__item__display')}>
                            Đồ điện tử
                            {!showSubElectronic && <FontAwesomeIcon className={cx('section__item__icon')} icon={faChevronDown} onClick={() => setShowSubElectronic(true)}/>}
                            {showSubElectronic && <FontAwesomeIcon className={cx('section__item__icon')} icon={faChevronUp} onClick={() => setShowSubElectronic(false)}/>}
                        </div>
                        {showSubElectronic && (
                            <div className={cx('section__item__sub')}>
                                <Link className={cx('section__item__sub__item')} to='?type=tu-lanh'>Tủ lạnh</Link>
                                <Link className={cx('section__item__sub__item')} to='?type=ti-vi'>Tivi</Link>
                                <Link className={cx('section__item__sub__item')} to='?type=dien-thoai'>Điện thoại</Link>
                                <Link className={cx('section__item__sub__item')} to='?type=may-tinh'>Máy tính</Link>
                            </div>
                        )}
                    </Link>
                </div>
            </div>
            <div className={cx('section')}>
                <h1 className={cx('section__title')}>CHỌN MỨC GIÁ</h1>
                <div className={cx('section__content')}>
                    <div className={cx('section__list')}>
                        {dataPrice.map((item, index) => {
                            return (
                                <div key={index} className={cx('section__list__item')}>
                                    <input id={index} type="checkbox" checked={checked === index} onChange={() => handleSelectPrice(item, index)}/>
                                    <label htmlFor={index}>{item.display}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default memo(Navigate);