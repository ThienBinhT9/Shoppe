import classNames from "classnames/bind";
import { NavLink } from 'react-router-dom'

import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('inner__content')}>
                    <div className={cx('section', 'section--shopping')}>
                        <h3 className={cx('section__title')}>SHOPPING</h3>
                        <div className={cx('section__body')}>
                            <p className={cx('section__body__item')}>Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mạng lại giá trị tốt nhất</p>
                            <p className={cx('section__body__item')}>Địa chỉ: 97 Ngõ 70 Văn Trì, Quận Bắc Từ Liêm, Hà Nội</p>
                            <p className={cx('section__body__item')}>Điện thoại: <a href="tel:0969975192">0969975192</a></p>
                            <p className={cx('section__body__item')}>Email: <a href="mail:phongtbt903@gmail.com">phongtbt903@gmail.com</a></p>
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <h3 className={cx('section__title')}>CHÍNH SÁCH</h3>
                        <div className={cx('section__body')}>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-thanh-vien'>Chính sách thành viên</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-thanh-toan'>Chính sách thanh toán</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-san-pham'>Chính sách đổi sản phẩm</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-bao-mat'>Chính sách bảo mật</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-cong-tac-vien'>Chính sách cộng tác viên</NavLink>
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <h3 className={cx('section__title')}>HƯỚNG DẪN</h3>
                        <div className={cx('section__body')}>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-thanh-vien'>Hướng dẫn mua hàng</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-thanh-toan'>Hướng dẫn đổi trả</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-san-pham'>Hướng dẫn thanh toán</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-bao-mat'>Chương trình cộng tác viên</NavLink>
                            <NavLink className={cx('section__body__item')} to='/chinh-sach/chinh-sach-cong-tac-vien'>Giải đáp thắc mắc</NavLink>
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <h3 className={cx('section__title')}>ĐĂNG KÝ NHẬN TIN</h3>
                        <div className={cx('section__body')}>
                            <p className={cx('section__body__item')}>Đăng ký ngay! Để nhận thật nhiều ưu đãi</p>
                            <div className={cx('footer__form')}>
                                <input className={cx('footer__form__input')} placeholder="Nhập địa chỉ email..."/>
                                <span className={cx('footer__form__btn')}>ĐĂNG KÝ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('author')}>
                Bản quyền thuộc về <span>Mr.Phong</span> | Cung cấp bởi <a href="https://www.facebook.com/profile.php?id=100070801670866" rel="noreferrer" target="_blank">Đỗ Hoài Phong</a>
            </div>
        </div>
     );
}

export default Footer;