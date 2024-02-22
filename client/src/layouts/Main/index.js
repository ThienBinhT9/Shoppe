import classNames from "classnames/bind";


import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitlePage from "../../components/TitlePage";
import styles from './Main.module.scss'

const cx = classNames.bind(styles)

function MainLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <TitlePage />
            <div className={cx('container')}>
                {children}
            </div>
            <Footer />
        </div>
     );
}

export default MainLayout;