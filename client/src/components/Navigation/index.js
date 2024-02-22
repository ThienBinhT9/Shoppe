import { memo } from "react";
import classNames from "classnames/bind";
import { NavLink } from 'react-router-dom'

import styles from './Navigation.module.scss'

const cx = classNames.bind(styles)

function Navigation() {
    return ( 
        <div className={cx('wrapper')}>
            <NavLink to='/' className={cx('nav__item')}>Trang chủ</NavLink>
            <NavLink to='/gioi-thieu' className={cx('nav__item')}>Giới thiệu</NavLink>
            <NavLink to='/san-pham' className={cx('nav__item')}>Sản phẩm</NavLink>
            <NavLink to='/he-thong' className={cx('nav__item')}>Hệ thống</NavLink>
            <NavLink to='/tin-tuc' className={cx('nav__item')}>Tin tức</NavLink>
            <NavLink to='/lien-he' className={cx('nav__item')}>Liên hệ</NavLink>
        </div>
     );
}

export default memo(Navigation);