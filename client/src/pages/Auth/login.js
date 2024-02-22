import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";


import styles from './Auth.module.scss'
import Loading from "../../components/Loading";
import { login } from '../../redux/requestService/auth.request'

const cx = classNames.bind(styles)

function Login() {

    const {message, isFetching, error} = useSelector(state => state.auth.login)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogin = () => {
        const body = {
            email,
            password
        }

        login(body, dispatch, navigate)
    }

    return ( 
        <div className={cx('wrapper')}>
            {isFetching && <Loading />}
            <div className={cx("auth__form")}>
                <div className={cx('btns-change')}>
                    <Link className={cx('btn-change','btns-chang-active')}>ĐĂNG NHẬP</Link>
                    <Link to='/dang-ki' className={cx('btn-change')}>ĐĂNG KÝ</Link>
                </div>
                <div className={cx('form')}>
                    <h1 className={cx('form__title')}>ĐĂNG NHẬP</h1>
                    <div className={cx('form__input')}>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className={cx('form__input')}>
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    {error && <span style={{color:'red', marginBottom:'12px'}}>{message}</span>}
                    <button className={cx('form__submit')} onClick={handleLogin} >Đăng nhập</button>
                </div>
            </div>
        </div>
     );
}

export default memo(Login);