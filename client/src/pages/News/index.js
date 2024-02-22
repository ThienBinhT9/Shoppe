import classNames from "classnames/bind";

import styles from './News.module.scss'

const cx = classNames.bind(styles)

function News() {
    return ( 
        <div className={cx('wrapper')}>
            <h1>News page</h1>
        </div>
     );
}

export default News;