import classNames from "classnames/bind";
import {useSelector, useDispatch} from 'react-redux'

import styles from './Products.module.scss'
import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from '../../redux/requestService/product.request'
import Loading from '../../components/Loading'
import ProductItem from "../../components/ProductItem";


import {formatPathToTitleV2} from '../../utils'
const cx = classNames.bind(styles)

function Content({priceSelected}) {

    const {_products, isFetching} = useSelector(state => state.product.getProducts)

    const dispatch = useDispatch()
    const {type} = useParams()

    const text = formatPathToTitleV2(type)

    useEffect(() => {
        getProducts(text, priceSelected.min, priceSelected.max, dispatch)
    },[text, priceSelected, dispatch])

    return ( 
        <div className={cx('content')}>
            <div className={cx('header')}>
                <h1 className={cx('header__title')}>{text || 'SẢN PHẨM'}</h1>
            </div>
            <div className={cx('body')}>
                {isFetching && <Loading />}
                <div className={cx('row')}>
                    {!isFetching && _products && _products.map((item, index) => {
                        return (
                            <div className={cx('col','l-3','lm-4','m-4','ms-4','s-6', 'mb-product')} key={index}>
                                <ProductItem item={item}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}

export default memo(Content);