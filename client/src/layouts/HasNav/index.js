import classNames from "classnames/bind";

import styles from './HasNav.module.scss'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavigationV2 from '../../components/NavigationV2'

const cx = classNames.bind(styles)

function HasNav({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('nav')}>
                    <NavigationV2 />
                </div>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HasNav;