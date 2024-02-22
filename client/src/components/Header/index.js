import classNames from "classnames/bind";

import styles from './Header.module.scss'
import logo_title from '../../assets/images/logo_title.png'
import logo_img from '../../assets/images/logo_img.jpg'
import Navigation from "../Navigation";
import Control from "../HeaderControl";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)


function Header() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to='/' className={cx('logo')}>
                    <img src={logo_img} alt="logo_img" className={cx('logo__img')}/>
                    <img src={logo_title} alt="logo_title" className={cx('logo__title')}/>
                </Link>
                <Navigation />
                <Control />
            </div>
        </div>
    );
}

export default Header;