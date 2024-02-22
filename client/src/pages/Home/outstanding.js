import classNames from "classnames/bind";

import styles from './Home.module.scss'
import SubOutstanding from "../../components/SubOutstanding";

const cx = classNames.bind(styles)

function Outstanding() {
    return ( 
        <div className={cx('outstanding')}>
            <div className={cx('row')}>
                <div className={cx('subOutstanding','col','l-6','s-12')}>
                    <SubOutstanding 
                        background__image='https://bizweb.dktcdn.net/100/494/385/themes/919262/assets/cate_1_img.jpg?1696088358372'
                        title='Sản phẩm bán chạy'
                        title_sub='Tiện ích cho nhu cầu sinh hoạt hàng ngày. Giải pháp An toàn - Tiết kiệm'
                        to={`/san-pham`}
                    />
                </div>
                <div className={cx('subOutstanding','col','l-2','s-6')}>
                    <SubOutstanding 
                        background__image='https://i.pinimg.com/564x/47/5d/7f/475d7f43c30ca22a6da8cbf51ba196e2.jpg'
                        title='Giày & Dép'
                        title_sub='Thẩm mỹ độc đáo'
                        to='/san-pham/giay'
                    />
                </div>
                <div className={cx('subOutstanding','col','l-2','s-6')}>
                    <SubOutstanding 
                        background__image='https://i.pinimg.com/564x/ce/53/dc/ce53dc0b403625723fdbc7a47bb9fad1.jpg'
                        title='Quần'
                        title_sub='Không gian nghệ thuật'
                        to='/san-pham/quan'
                    />
                </div>
                <div className={cx('subOutstanding','col','l-2','s-6')}>
                    <SubOutstanding 
                        background__image='https://i.pinimg.com/564x/b2/ec/db/b2ecdb356a310ede4e3fbeacbd0004b0.jpg'
                        title='Áo'
                        title_sub='Đa dạng mẫu mã'
                        to='/san-pham/ao'
                    />
                </div>
                <div className={cx('subOutstanding','col','l-2','s-6')}>
                    <SubOutstanding 
                        background__image='https://bizweb.dktcdn.net/100/494/385/themes/919262/assets/cate_5_img.jpg?1696088358372'
                        title='Đồ nội thất'
                        title_sub='Trang trí không gian'
                    />
                </div>
                <div className={cx('subOutstanding','col','l-4','s-12')}>
                    <SubOutstanding 
                        background__image='https://bizweb.dktcdn.net/100/494/385/themes/919262/assets/cate_6_img.jpg?1696088358372'
                        title='Top sản phẩm hàng đầu'
                        title_sub='Thiết kế đơn giản - Tinh tế - Hiện đại'
                    />
                </div>
                <div className={cx('subOutstanding','col','l-6','s-12')}>
                    <SubOutstanding 
                        background__image='https://bizweb.dktcdn.net/100/494/385/themes/919262/assets/cate_7_img.jpg?1696088358372'
                        title='Sản phẩm thủ công'
                        title_sub='Đường nét chạm khắc tinh tế'
                    />
                </div>
            </div>
        </div>
    );
}

export default Outstanding;