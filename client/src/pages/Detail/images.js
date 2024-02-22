import classNames from "classnames/bind";
import {Swiper, SwiperSlide} from 'swiper/react'

import styles from './Detail.module.scss'
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading";

const cx = classNames.bind(styles)


function Images({product, isFetching}) {

    const [activeIndex, setActiveIndex] = useState(1)

    const handleChangeImage = (swiper) => {
        setActiveIndex(swiper.realIndex + 1)
    }

    return ( 
        <div className={cx('product_images')}>
            {isFetching && <Loading />}
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                grabCursor={true}
                onSlideChange={handleChangeImage}
            >
                {
                    !isFetching && product && product.product_images.map((item,index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={cx('image')}>
                                    <img src={item} alt=""/>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                <div className={cx('btn-favorite')}><FontAwesomeIcon icon={faHeart} /></div>
                <span className={cx('images__quantity')}>{`${activeIndex} / ${product?.product_images.length}`}</span>
            </Swiper>
        </div>
     );
}

export default memo(Images);