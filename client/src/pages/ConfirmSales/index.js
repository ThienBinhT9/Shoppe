import {useDispatch, useSelector} from 'react-redux'
import classnames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { memo, useEffect, useState } from 'react'

import styles from './ConfirmSale.module.scss'
import logo_img from '../../assets/images/logo_img.jpg'
import logo_title from '../../assets/images/logo_title.png'
import Wrapper from '../../components/WrapperDropdown'
import { createAxios } from '../../utils'
import img from '../../assets/images/confirm_sales.png'
import { loginSuccess } from '../../redux/authSlice'
import { logout } from '../../redux/requestService/auth.request'
import { confirmSales } from '../../redux/requestService/user.request'
import axios from 'axios'

const cx = classnames.bind(styles)


function ConfirmSale() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const current_user = useSelector(state => state.auth.current_user)

    const axiosInstance = createAxios(current_user, dispatch, loginSuccess)

    const [phone, setPhone] = useState()
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [alley, setAlly] = useState('')
    const [dataProvince, setDataProvince] = useState([])
    const [dataDistrict, setDataDistrict] = useState([])
    const [dataWard, setDataWard] = useState([])

    const handleChooseProvince = (e) => {
        setProvince(prev => e.target.value)
        setProvince(prev => {
            if(prev === ''){
                setDistrict('')
                setWard('')
                setAlly('')
            }
            return e.target.value
        })
        setProvince(prev => {
            dataProvince.map(item => {
                if(prev === item.name){
                    setDataDistrict(item.districts)
                }
                return []
            })
            return e.target.value
        })
        
    }

    const handleChooseDistrict = (e) => {
        setDistrict(prev => e.target.value)
        setDistrict(prev => {
            if(prev === ''){
                setWard('')
                setAlly('')
            }
            return e.target.value
        })
        setDistrict(prev => {
            dataDistrict.map(item => {
                if(prev === item.name){
                    setDataWard(item.wards)
                }
                return []
            })
            return e.target.value
        })
    }

    const handleChooseWard = (e) => {
        setWard(prev => e.target.value)
        setWard(prev => {
            if(prev === ''){
                setAlly('')
            }
            return e.target.value
        })
    }


    const handleLogout = () => {
        logout(axiosInstance, current_user._id, current_user.access_token, dispatch, navigate)
    }

    const handleActiveShop = () => {
        if(!province || !district || !ward || !alley || !phone){
            alert('Bạn chưa nhập đầy đủ thông tin.')
            return
        }
        const address = `${alley}, ${ward}, ${district}, ${province}`.trim()
        const body = {
            phone,
            address
        }
        confirmSales(axiosInstance, current_user._id, current_user.access_token, body, dispatch, navigate)
    }

    useEffect(() => {
        const calldata = async() => { 
            const data = await (await axios.get('https://provinces.open-api.vn/api/?depth=3')).data
            setDataProvince(data)
        }
        calldata()
    },[])

    return ( 
        <div className={cx('wrapper')}>
                <header className={cx('header')}>
                    <div className={cx('header__inner')}>
                        <div className={cx('header__content')}>
                            <div className={cx('logo')}>
                                <img className={cx('logo__img')} src={logo_img} alt="logo_img"/>
                                <img className={cx('logo__title')} src={logo_title} alt="logo_img"/>
                                <h4 className={cx('logo__des')}>Đăng kí trở thành người bán của ShoppingGarden</h4>
                            </div>
                            <Tippy
                                interactive={true}
                                placement={'top-end'}
                                render={attrs => (
                                <div className={cx('dropdown__user--unlogin')} tabIndex="-1" {...attrs}>
                                    <Wrapper>
                                        <p className={cx('dropdown__user--unlogin__btn')} onClick={handleLogout}>Đăng xuất</p>
                                    </Wrapper>
                                </div>
                                )}
                            >
                                <div className={cx('options__user')}>
                                    <div className={cx('avatar')}>
                                        <img src={current_user?.avatar} alt="avatar"/>
                                    </div>
                                    <span>{current_user?.username}</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </header>
                <div className={cx('body')}>
                    <div className={cx('body__inner')}>
                        <div className={cx('img')}>
                            <img src={img} alt='img_confirm_sales'/>
                        </div>
                        <h3 className={cx('body__title')}>Chào mừng đến với ShoppingGarden!</h3>
                        <p className={cx('body__desc')}>Để đăng ký bán hàng trên ShoppingGarden, bạn cần cung cấp thêm thông tin về cửa hàng cho chúng tôi. "Vui lòng nhập đầy đủ thông tin nhé!"</p>
                        <div className={cx('more-info')}>
                            <div className={cx('form')}>
                                <label>Số điện thoại</label>
                                <input placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className={cx('form','form__location')}>
                                <label>Địa chỉ cửa hàng</label>
                                <select value={province} onChange={handleChooseProvince}>
                                    <option value=''>Chọn tỉnh thành</option>
                                    {dataProvince && dataProvince.map(item => {
                                        return <option key={item.code} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                                <select value={district} onChange={handleChooseDistrict} disabled={province ? false : true}>
                                    <option value=''>Chọn quận/huyện</option>
                                    {dataDistrict && dataDistrict.map(item => {
                                        return <option key={item.code} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                                <select value={ward} onChange={handleChooseWard} disabled={(province && district) ? false : true}>
                                    <option value=''>Chọn phường/xã</option>
                                    {dataWard && dataWard.map(item => {
                                        return <option key={item.code} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                                <input placeholder='Số nhà hoặc ngõ' value={alley} onChange={e => setAlly(e.target.value)} disabled={(province && district && ward) ? false : true}/>
                            </div>
                        </div>
                        <div className={cx('btns')}>
                            <Link className={cx('btn')} to='/'>Trở lại</Link>
                            <span className={cx('btn', 'btn-submit')} onClick={handleActiveShop}>Đăng kí</span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default memo(ConfirmSale);