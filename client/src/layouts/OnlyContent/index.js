import classNames from "classnames/bind";

import styles from './OnlyContent.module.scss'

const cx = classNames.bind(styles)

function OnlyContent({children}) {
    return ( 
        <div className={cx('wrapper')}>
            {children}
        </div>
     );
}

export default OnlyContent;