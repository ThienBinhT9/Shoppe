import axios from 'axios'
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
} from '../authSlice'

import {
    systemShopStart,
    systemShopSuccess,
    systemShopFailed
} from '../userSlice'

let URL_HOST = 'http://localhost:8000'

const confirmSales = async(axiosInstance, user_id, access_token, body, dispatch, navigate) => {
    try {
        const result = await axiosInstance.patch(`${URL_HOST}/user/confirmSales`, body, {
            headers:{
                access_token,
                'x-client-id':user_id
            }
        })
        dispatch(updateUserSuccess(result.data))
        navigate('/')
    } catch (error) {
    }
}

const update = async(axiosInstance, body, user_id, access_token, dispatch) => {
    try {
        dispatch(updateUserStart())
        const result = await axiosInstance.patch(`${URL_HOST}/user/update`, body, {
            headers:{
                access_token,
                'x-client-id': user_id
            }
        })
        dispatch(updateUserSuccess(result.data))
    } catch (error) {
        dispatch(updateUserFailed(error.response.data || 'Có lỗi sảy ra!'))
    }
}

const getSystemShop = async(q, province, district, dispatch) => {
    try {
        dispatch(systemShopStart())
        const shops = await axios.get(`${URL_HOST}/user/shops?q=${q}&province=${province}&district=${district}`)
        dispatch(systemShopSuccess(shops.data))
    } catch (error) {
        dispatch(systemShopFailed())
    }
}

export { update, confirmSales, getSystemShop }