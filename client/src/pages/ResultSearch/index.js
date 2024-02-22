import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './ResultSearch.module.scss'
import ProductItem from '../../components/ProductItem'
import { search } from '../../redux/requestService/product.request'
import Search from "./search";

const cx = classNames.bind(styles)

function ResultSearch() {

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const {_products, isFetching} = useSelector(state => state.product.search)

    useEffect(() => {
        search(searchParams, dispatch)
    },[searchParams, dispatch])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {_products?.length === 0 && (
                    <div className={cx('search-if-empty')}>
                        <p className={cx('search-empty-text')}>Không tìm thấy bất kỳ kết quả nào với từ khóa "{searchParams}"</p>
                        <h1 className={cx('search-empty-h1')}>Nhập từ khóa để tìm kiếm</h1>
                        <Search />
                    </div>
                )}
                {_products?.length > 0 && (
                    <div className={cx('results-search')}>
                        <Search />
                        <div className={cx('results-body')}>
                            <div className={cx('row')}>
                                {!isFetching && _products && _products.map((item, index) => {
                                    return (
                                        <div className={cx('col','l-2','lm-3','m-4','s-6')}>
                                            <ProductItem key={index} item={item}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResultSearch;