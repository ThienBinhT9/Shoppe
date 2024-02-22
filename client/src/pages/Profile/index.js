import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";

import styles from './Profile.module.scss'
import TitleAccount from "../../components/TitleAccount";
import {createAxios, validateInput} from '../../utils'
import { update } from '../../redux/requestService/user.request'
import { loginSuccess } from "../../redux/authSlice";
import Loading from '../../components/Loading'

const cx = classNames.bind(styles)

function Profile() {

    
    const current_user = useSelector(state => state.auth.current_user)
    const { isFetching } = useSelector(state => state.auth.updateUser)

    const dispatch = useDispatch()

    const axiosInstance = createAxios(current_user, dispatch, loginSuccess)

    const [username, setUsername] = useState(current_user?.username)
    const [email, setEmail] = useState(current_user?.email)
    const [formDataAvatar, setFormDataAvatar] = useState('')
    const [avatar, setAvatar] = useState(current_user?.avatar)

    const handleChangeAvatar = (e) => {
        setFormDataAvatar(e.target.files[0])

        if(e.target.files[0]){
            const reader = new FileReader()

            reader.onload = (e) => {
                const temporaryUrl = e.target.result;
                setAvatar(temporaryUrl);
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleUpdateUser = () => {
        
        if(!validateInput('username', username) || !validateInput('email', email)) return;
        if(username === current_user.username && email === current_user.email) return;

        const uploadData = new FormData()
        
        uploadData.append('avatar', formDataAvatar)
        uploadData.append('username', username)
        uploadData.append('email', email)

        update(axiosInstance, uploadData, current_user._id, current_user.access_token, dispatch)
    }

    return ( 
        <div className={cx('wrapper')}>
            <TitleAccount title='Hồ sơ của tôi' titleSub='Quản lý thông tin hồ sơ để bảo mật tài khoản' />

            <div className={cx('body')}>
                {isFetching && <Loading />}
                <div className={cx('form')}>
                    <div className={cx('form__input')}>
                        <label className={cx('form__input__label')}>Tên</label>
                        <input className={cx('form__input__text')} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className={cx('form__input')}>
                        <label className={cx('form__input__label')}>Email</label>
                        <input className={cx('form__input__text')} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {current_user.phone && (
                        <div className={cx('form__input')}>
                            <label className={cx('form__input__label')}>Số điện thoại</label>
                            <input className={cx('form__input__text')} type="text" value={current_user.phone}/>
                        </div>
                    )}
                    <span className={cx('btn-submit')} onClick={handleUpdateUser}>Lưu</span>
                </div>
                <div className={cx('avatar')}>
                    <div className={cx('avatar__img')}>
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <label htmlFor="avatar" className={cx('avatar__submit')}>Chọn ảnh</label>
                    <input type="file" id="avatar" accept="image/*" onChange={handleChangeAvatar}/>
                </div>
            </div>
        </div>
     );
}

export default Profile;