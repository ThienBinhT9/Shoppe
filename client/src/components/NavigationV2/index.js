import classNames from "classnames/bind";

import styles from './NavigationV2.module.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRectangleList, faBell } from '@fortawesome/free-regular-svg-icons'
import {faTicket, faPlus, faBoxArchive, faUserTag} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

const cx = classNames.bind(styles)


function NavigationV2() {

    const user = useSelector(state => state.auth.current_user)

    return ( 
        <div className={cx('wrapper')}>
            <NavLink to='/user/tai-khoan-cua-toi' className={cx('nav__item')}>
                <FontAwesomeIcon icon={faUser} />
                <span>Tài khoản</span>
            </NavLink>
            <NavLink to='/user/dang-san-pham' className={cx('nav__item')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Tạo sản phẩm</span>
            </NavLink>
            <NavLink to='/user/don-mua' className={cx('nav__item')}>
                <FontAwesomeIcon icon={faRectangleList} />
                <span>Đơn mua</span>
            </NavLink>
            <NavLink to='/user/ma-giam-gia' className={cx('nav__item')}>
                <FontAwesomeIcon icon={faTicket} />
                <span>Mã giảm giá</span>
            </NavLink>
            <NavLink to='/user/notification' className={cx('nav__item')}>
                <FontAwesomeIcon icon={faBell} />
                <span>Thông báo</span>
            </NavLink>
            {user?.status === 'active' && (
                <NavLink to='/user/kho-luu-tru' className={cx('nav__item')}>
                    <FontAwesomeIcon icon={faBoxArchive} />
                    <span>Kho sản phẩm</span>
                </NavLink>
            )}
        </div>
     );
}

export default NavigationV2;