import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from './HomeLayout.module.scss'

const cx = classNames.bind(styles)

function HomeLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {children}
            </div>
            <Footer />
        </div>
     );
}

export default HomeLayout;