import {
    getMyCartStart,
    getMyCartSuccess,
    getMyCartFailed,
    deleteProductOfCartStart,
    deleteProductOfCartSuccess,
    deleteProductOfCartFailed,
    addToCartStart,
    addToCartSuccess,
    addToCartFailed,
    updateQuantityProductStart,
    updateQuantityProductSuccess,
    updateQuantityProductFailed
} from '../cartSlice'

let URL_HOST = 'http://localhost:8000'

const getMyCart = async(axiosInstance, user_id, access_token, dispatch) => {
    try {
        dispatch(getMyCartStart())
        const result = await axiosInstance.get(`${URL_HOST}/cart`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(getMyCartSuccess(result.data))
    } catch (error) {
        dispatch(getMyCartFailed())
    }
}

const deleteProductOfMyCart = async(axiosInstance, user_id, access_token, product_id, dispatch) => {
    try {
        dispatch(deleteProductOfCartStart())
        const result = await axiosInstance.delete(`${URL_HOST}/cart/${product_id}`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(deleteProductOfCartSuccess(result.data))
    } catch (error) {
        dispatch(deleteProductOfCartFailed())
    }
}

const addProductToCart = async(axiosInstance, user_id, access_token, data, dispatch) => {
    try {
        dispatch(addToCartStart())
        const result = await axiosInstance.post(`${URL_HOST}/cart/addProduct`, data, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(addToCartSuccess(result.data))
    } catch (error) {
        dispatch(addToCartFailed())
    }
}

const updateQuantityProduct = async(axiosInstance, user_id, access_token, data, dispatch) => {
    try {
        dispatch(updateQuantityProductStart())
        const result = await axiosInstance.patch(`${URL_HOST}/cart/quantityProduct`, data, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(updateQuantityProductSuccess(result.data))
    } catch (error) {
        dispatch(updateQuantityProductFailed())
    }
}

export { getMyCart, deleteProductOfMyCart, addProductToCart, updateQuantityProduct }
