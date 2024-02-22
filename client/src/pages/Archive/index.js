import classNames from "classnames/bind";

import styles from './Archive.module.scss'
import Draft from "./draft";
import Published from "./published";
import { useState } from "react";

const cx = classNames.bind(styles)

function Archive() {

    const [active, setActive] = useState('draft')

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('btn-createAndGet-archive')}>
                <span className={cx('btn-nav-archive', {active: active === 'draft'})} onClick={() => setActive('draft')}>Sản phẩm chưa công khai</span>
                <span className={cx('btn-nav-archive', {active: active === 'published'})} onClick={() => setActive('published')}>Sản phẩm đang bán</span>
            </div>
            {active === 'draft' && <Draft />}
            {active === 'published' && <Published />}
        </div>
     );
}

export default Archive;