import classNames from "classnames/bind";

import styles from './FavoriteProduct.module.scss'
import { useEffect } from "react";

const cx = classNames.bind(styles)

function FavoriteProduct() {

    useEffect(() => {
        
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <h1>Favorite Product pages</h1>
        </div>
    );
}

export default FavoriteProduct;