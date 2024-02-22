import * as yup from 'yup'
import { memo } from "react";
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import styles from './Auth.module.scss'
import Loading from "../../components/Loading";
import { register } from '../../redux/requestService/auth.request'

const cx = classNames.bind(styles)

function Register() {

    const {message, isFetching, error} = useSelector(state => state.auth.register)
    console.log(message);
    console.log(error);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:""
        },
        validationSchema: yup.object({
            username: yup.string()
            .max(20, 'Tối đa 20 kí tự')
            .min(2, 'Tối thiểu 2 kí tự')
            .required('Bạn chưa nhập trường này'),
            email: yup.string()
            .max(50, 'Tối đa 50 kí tự')
            .required('Bạn chưa nhập trường này')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email'),
            password: yup.string()
            .min(6, 'Mật khẩu tối thiểu 6 kí tự')
            .max(12, 'Mật khẩu chỉ được tối đa 12 kí tự')
            .required('Vui lòng nhập trường này')
        }),
        onSubmit:(values) =>{
            const body = {
                ...values
            }
            register(body, dispatch, navigate)
            
        }
    })

    return ( 
        <div className={cx('wrapper')}>
            {isFetching && <Loading />}
            <div className={cx("auth__form")}>
                <div className={cx('btns-change')}>
                    <Link to='/dang-nhap' className={cx('btn-change')}>ĐĂNG NHẬP</Link>
                    <Link className={cx('btns-chang-active','btn-change')}>ĐĂNG KÝ</Link>
                </div>
                <div className={cx('form')}>
                    <h1 className={cx('form__title')}>ĐĂNG KÝ</h1>
                    <div className={cx('form__input')}>
                        <input id="username" placeholder="Tên đăng nhập" onChange={formik.handleChange} value={formik.values.username}/>
                        {formik.errors.username && <span>{formik.errors.username}</span>}
                    </div>
                    <div className={cx('form__input')}>
                        <input id="email" type="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.errors.email && <span>{formik.errors.email}</span>}
                    </div>
                    <div className={cx('form__input')}>
                        <input id="password" type="password" placeholder="Mật khẩu" onChange={formik.handleChange}/>
                        {formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>
                    {error && <span style={{color:'red', marginBottom:'12px'}}>{message}</span>}
                    <button onClick={formik.handleSubmit} className={cx('form__submit')}>Đăng ký</button>
                </div>
            </div>
        </div>
     );
}

export default memo(Register);