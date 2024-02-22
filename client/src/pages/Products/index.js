import classNames from "classnames/bind";

import styles from './Products.module.scss'
import Navigate from "./Navigation";
import Content from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { memo, useEffect, useState } from "react";

const cx = classNames.bind(styles)


function Products() {

    const [scrollPosition, setScrollPosition] = useState(0)
    const [priceSelect, setPriceSelect] = useState({})

    const handleScroll = (e) => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    useEffect(() => {
        const scroll = (e) => {
            setScrollPosition(window.scrollY)               
        }
        document.addEventListener('scroll', scroll)

        return () => document.removeEventListener('scroll', scroll)
    },[])


    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('col','l-3','m-12')}>
                        <Navigate setPriceSelect={setPriceSelect}/>
                    </div>
                    <div className={cx('col','l-9','m-12')}>
                        <Content priceSelected={priceSelect}/>
                    </div>
                </div>
                {scrollPosition > 1200 && (
                    <div className={cx('btn-scroll-top')} onClick={handleScroll} >
                        <FontAwesomeIcon icon={faAnglesUp} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Products);