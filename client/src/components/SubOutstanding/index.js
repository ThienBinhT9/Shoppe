import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import { memo } from "react";

import styles from './SubOutstanding.module.scss'

const cx = classNames.bind(styles)

function SubOutstanding({background__image, title, title_sub, to}) {
    return ( 
        <div className={cx('wrapper')} style={{backgroundImage:`url(${background__image})`}}>
            <Link className={cx('title')} to={to}>{title}</Link>
            <p className={cx('title_sub')}>{title_sub}</p>
        </div>
    );
}

export default memo(SubOutstanding);