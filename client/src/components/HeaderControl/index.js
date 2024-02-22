import classNames from "classnames/bind";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react/headless';
import { memo, useCallback, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faSearch, faBagShopping, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import styles from './HeaderControl.module.scss'
import Model, { ModelContent } from "../Model";
import InputSearch from "./InputSearch";
import Wrapper from "../WrapperDropdown";
import { useDispatch, useSelector } from "react-redux";
import {createAxios} from '../../utils'
import { loginSuccess } from "../../redux/authSlice";
import { logout } from '../../redux/requestService/auth.request'

const cx = classNames.bind(styles)

function Control() {

    const [showModelSearch, setShowModelSearch] = useState(false)
    const [showModelNav, setShowModelNav] = useState(false)

    const current_user = useSelector(state => state.auth.current_user)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosInstance = createAxios(current_user, dispatch, loginSuccess)


    const handleShowModelSearch = () => {
        setShowModelSearch(true)
    }

    const handleShowModelNav = () => {
        setShowModelNav(true)
    }

    const handleCloseModelSearch = useCallback(() => {
        setShowModelSearch(false)
        setShowModelNav(false)
    },[])

    const handleLogout = () => {
        logout(axiosInstance, current_user._id, current_user.access_token, dispatch, navigate)
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header__menu')}>
                <FontAwesomeIcon className={cx('header__menu__icon')} icon={faBars} onClick={handleShowModelNav}/>
                {showModelNav && (
                    <Model>
                        <ModelContent onClose={handleCloseModelSearch} className={cx('model__nav')} title='Điều hướng' isLeftToRight>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/'>Trang chủ</NavLink>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/gioi-thieu'>Giới thiệu</NavLink>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/san-pham'>Sản phẩm</NavLink>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/he-thong'>Hệ thống</NavLink>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/tin-tuc'>Tin tức</NavLink>
                            <NavLink className={cx('model__nav__item')} onClick={handleCloseModelSearch} to='/lien-he'>Liên hệ</NavLink>
                        </ModelContent>
                    </Model>
                )}
            </div>
            <div className={cx('controls')}>
                <div className={cx('control__item')}>
                    <FontAwesomeIcon className={cx('control__item__icon')} icon={faSearch} onClick={handleShowModelSearch}/>
                    {showModelSearch && (
                        <Model isScale>
                            <ModelContent onClose={handleCloseModelSearch} className={cx('model__search')}>
                                <InputSearch onCloseModelSearch={handleCloseModelSearch}/>
                            </ModelContent>
                        </Model>
                    )}
                </div>
                {current_user && (
                    <Tippy
                        interactive={true}
                        placement={'top-end'}
                        render={attrs => (
                        <div className={cx('dropdown__user--unlogin')} tabIndex="-1" {...attrs}>
                            <Wrapper>
                                <Link className={cx('dropdown__user--unlogin__btn')} to='/user/tai-khoan-cua-toi'>Tài khoản của tôi</Link>
                                {current_user.status === 'inactive' && <Link className={cx('dropdown__user--unlogin__btn')} to='/xac-nhan-ban-hang'>Kênh bán hàng</Link>}
                                {current_user.status === 'active' && <Link className={cx('dropdown__user--unlogin__btn')} to='/user/dang-san-pham'>Tạo sản phẩm</Link>}
                                <Link className={cx('dropdown__user--unlogin__btn')} to='/user/ma-giam-gia'>Mã giảm giá</Link>
                                <Link className={cx('dropdown__user--unlogin__btn')} to='/user/don-mua'>Đơn mua</Link>
                                <p className={cx('dropdown__user--unlogin__btn')} onClick={handleLogout}>Đăng xuất</p>
                            </Wrapper>
                        </div>
                        )}
                    >
                        <div className={cx('control__item')}>
                            <div className={cx('control__item__avatar')}>
                                <img src={current_user?.avatar} alt="avatar"/>
                            </div>
                            <FontAwesomeIcon className={cx('control__item__icon-down')} icon={faChevronDown} />
                        </div>
                    </Tippy>
                )}
                {!current_user && (
                    <Tippy
                        interactive={true}
                        placement={'top-end'}
                        render={attrs => (
                        <div className={cx('dropdown__user--unlogin')} tabIndex="-1" {...attrs}>
                            <Wrapper>
                                <Link to='/dang-ki' className={cx('dropdown__user--unlogin__btn')}>Đăng kí</Link>
                                <Link to='/dang-nhap' className={cx('dropdown__user--unlogin__btn')}>Đăng nhập</Link>
                            </Wrapper>
                        </div>
                        )}
                    >
                        <div className={cx('control__item')}><FontAwesomeIcon className={cx('control__item__icon')} icon={faUser} /></div>
                    </Tippy>
                )}
                <NavLink to='/san-pham-yeu-thich' className={cx('control__item')}>
                    <FontAwesomeIcon className={cx('control__item__icon')} icon={faHeart} />
                </NavLink>
                <NavLink to={current_user ? '/gio-hang' : '/dang-nhap'} className={cx('control__item')}>
                    <FontAwesomeIcon className={cx('control__item__icon')} icon={faBagShopping} />
                </NavLink>
            </div>
        </div>
    );
}

export default memo(Control);