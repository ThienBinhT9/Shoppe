import classnames from "classnames/bind";

import styles from './Discount.module.scss'
import CreateDiscount from "./create";
import GetDiscount from "./get";
import { useState } from "react";

const cx = classnames.bind(styles)

function Discount() {

    const [active, setActive] = useState('create')

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('btn-createAndGet-discount')}>
                <span className={cx('btn-nav-discount', {active: active === 'create'})} onClick={() => setActive('create')}>Tạo mới mã</span>
                <span className={cx('btn-nav-discount', {active: active === 'get'})} onClick={() => setActive('get')}>Mã giảm giá đang chia sẻ</span>
            </div>
            {active === 'get' && <GetDiscount />}
            {active === 'create' && <CreateDiscount />}
        </div>
     );
}

export default Discount;