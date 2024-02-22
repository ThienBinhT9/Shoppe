import classNames from "classnames/bind";

import styles from './TitleAccount.module.scss'
import { memo } from "react";

const cx = classNames.bind(styles)

function TitleAccount({title, titleSub, isBtn}) {
    return ( 
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{title}</h1>
            {titleSub && <p className={cx('title__sub')}>{titleSub}</p>}
        </div>
    );
}

export default memo(TitleAccount);