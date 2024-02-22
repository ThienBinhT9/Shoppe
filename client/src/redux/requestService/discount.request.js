// import axios from 'axios'

import axios from 'axios'
import {
    createDiscountStart,
    createDiscountSuccess,
    createDiscountFailed,
    getYourShopCreatedStart,
    getYourShopCreatedSuccess,
    getYourShopCreatedFailed,
    deleteDiscountStart,
    deleteDiscountSuccess,
    deleteDiscountFailed,
    getDiscountValidOfShopStart,
    getDiscountValidOfShopSuccess,
    getDiscountValidOfShopFailed
} from '../discountSlice'

let URL_HOST = 'http://localhost:8000'


//Tạo mã giảm giá
const createDiscount = async(axiosInstance, user_id, access_token, data, dispatch) => {
    try {
        dispatch(createDiscountStart())
        const result = axiosInstance.post(`${URL_HOST}/discount`, data, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(createDiscountSuccess(result.data))
    } catch (error) {
        dispatch(createDiscountFailed())
    }
}

//Lấy mã giảm giá mà mình đã tạo ra
const getYourShopDiscountCreated = async(axiosInstance, user_id, access_token, dispatch) => {
    try {
        dispatch(getYourShopCreatedStart())
        const results = await axiosInstance.get(`${URL_HOST}/discount/mydiscount`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(getYourShopCreatedSuccess(results.data))
    } catch (error) {
        dispatch(getYourShopCreatedFailed())
    }
}

// Xóa mydiscount đã tạo trước đó
const deleteDiscount = async(axiosInstance, user_id, access_token, discount_id, dispatch) => {
    try {
        dispatch(deleteDiscountStart())
        const result = await axiosInstance.delete(`${URL_HOST}/discount/${discount_id}`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(deleteDiscountSuccess(result.data))
    } catch (error) {
        dispatch(deleteDiscountFailed(error.response.message || 'Đã có lỗi xảy ra!'))
    }
}

const getDiscountValidOfShop = async(body, dispatch) => {
    try {
        dispatch(getDiscountValidOfShopStart())
        const results = await axios.post(`${URL_HOST}/discount/getDiscountValidOfShop`, body)
        dispatch(getDiscountValidOfShopSuccess(results.data))
    } catch (error) {
        dispatch(getDiscountValidOfShopFailed())
    }
}



export {createDiscount, getYourShopDiscountCreated, deleteDiscount, getDiscountValidOfShop}