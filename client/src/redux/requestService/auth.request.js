import axios from 'axios'
import {
    loginStart, 
    loginSuccess, 
    loginFailed, 
    registerStart, 
    registerSuccess, 
    registerFailed, 
    logoutStart,
    logoutSuccess, 
    logoutFailed
} from '../authSlice'

let URL_HOST = 'http://localhost:8000'

const register = async(body, dispatch, navigate) => {
    try {
        dispatch(registerStart())
        const result = await axios.post(`${URL_HOST}/auth/register`, body)
        dispatch(registerSuccess(result.data))
        navigate('/')
    } catch (error) {
        dispatch(registerFailed(error.response.data || 'Có lỗi sảy ra'))
    }
}

const login = async(body, dispatch, navigate) => {
    try {
        dispatch(loginStart())
        const result = await axios.post(`${URL_HOST}/auth/login`, body)
        dispatch(loginSuccess(result.data))
        navigate('/')
    } catch (error) {
        dispatch(loginFailed(error.response.data || 'Có lỗi sảy ra'))
    }
}

const logout = async(axiosInstance, user_id, access_token, dispatch, navigate) => {
    try {
        dispatch(logoutStart())
        await axiosInstance.post(`${URL_HOST}/auth/logout`, user_id, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(logoutSuccess())
        navigate('/dang-nhap')
    } catch (error) {
        dispatch(logoutFailed())
    }
}

const handleRefreshToken = async(user_id, refresh_token) => {
    try {
        const result = await axios.post(`${URL_HOST}/auth/refresh`, "", {
            headers:{
                'x-client-id':user_id,
                refresh_token
            }
        })
        return result.data
    } catch (error) {
        console.log('Lỗi không refreshToken được');
    }
}


export { login, register, logout, handleRefreshToken }