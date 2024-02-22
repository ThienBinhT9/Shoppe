import classNames from "classnames/bind";
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import styles from './System.module.scss'
import { getSystemShop } from '../../redux/requestService/user.request'
import useDebouce from '../../hooks/useDebouce'
import Loading from '../../components/Loading'

const cx = classNames.bind(styles)

function System() {


    const { shops, isFetching } = useSelector(state => state.user.systemShop)

    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [dataProvince, setDataProvince] = useState([])
    const [dataDistrict, setDataDistrict] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [focusMap, setFocusMap] = useState(shops?.[0].address || 'University of Oxford')

    const dispatch = useDispatch()
    const debouceValue = useDebouce(valueSearch, 1000)

    const handleChangeProvince = (e) => {
        setProvince(prev => e.target.value)
        setProvince(prev => {
            if(prev !== province) setDistrict('')
            return e.target.value
        })
        setProvince(prev => {
            dataProvince.map(item => {
                if(prev === item.name) setDataDistrict(item.districts)
                return []
            })
            return e.target.value
        })
    }

    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value)
    }

    const handleFocusMap = (address) => {
        setFocusMap(address)
    }
    console.log(focusMap);

    useEffect(() => {
        const calldata = async() => {
            const data = await (await axios.get('https://provinces.open-api.vn/api/?depth=3')).data
            setDataProvince(data)
        }
        calldata()
    },[])

    useEffect(() => {
        getSystemShop(debouceValue, province, district, dispatch)
    },[province, district, debouceValue, dispatch])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <input className={cx('input__search')} value={valueSearch} placeholder="Nhập tên cửa hàng bạn muốn tìm" onChange={e => setValueSearch(e.target.value)}/>
                    <select className={cx('select__province')} onChange={handleChangeProvince} value={province}>
                        <option className={cx('section__form__option')} value="">Chọn tỉnh thành</option>
                        {dataProvince && dataProvince.map(item => {
                            return <option key={item.code} className={cx('section__form__option')} value={item.name}>{item.name}</option>
                        })}
                    </select>
                    <select className={cx('select__district')} value={district} disabled={province ? false : true} onChange={handleChangeDistrict}>
                        <option className={cx('section__form__option')} value="">Chọn quận/huyện</option>
                        {dataDistrict && dataDistrict.map(item => {
                            return <option key={item.code} className={cx('section__form__option')} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body__left')}>
                        {isFetching && <Loading />}
                        {!isFetching && shops && shops.map((item, index) => {
                            return (
                                <div className={cx('store')} key={index} onClick={() => handleFocusMap(item.address)}>
                                    <p className={cx('store__name')}>Garden {item.username}</p>
                                    <p className={cx('store__address')}><span>Địa chỉ:</span> {item.address}</p>
                                    <p className={cx('store__phone')}><span>Hotline:</span> <a href="tel:0969975192">{item.phone}</a></p>
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className={cx('body__right')}>
                    <iframe className={cx("gmap_iframe")} width='100%' title="map" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?hl=en&amp;q=Hanoi University of Industry&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default System;