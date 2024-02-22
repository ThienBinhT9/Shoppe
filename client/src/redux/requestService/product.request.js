import axios from 'axios'
import {
    createStart, 
    createSuccess, 
    createFailed,
    archiveStart,
    archiveSuccess,
    archiveFailed,
    publishStart,
    publishSuccess,
    publishFailed,
    getProductStart,
    getProductSuccess,
    getProductFailed,
    publishedStart,
    publishedSuccess,
    publishedFailed,
    unPublishStart,
    unPublishSuccess,
    unPublishFailed,
    deleteStart,
    deleteSuccess,
    deleteFailed,
    detailStart,
    detailSuccess,
    detailFailed,
    similarStart,
    similarSuccess,
    similarFailed,
    searchStart,
    searchSuccess,
    searchFailed,
    favoriteStart,
    favoriteSuccess,
    favoriteFailed
} from '../productSlice'

let URL_HOST = 'http://localhost:8000'

const create = async(axiosInstance, user_id, access_token, body, dispatch) => {
    try {
        dispatch(createStart())
        const result = await axiosInstance.post(`${URL_HOST}/product/create`, body, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(createSuccess(result?.data))
        
    } catch (error) {
        dispatch(createFailed(error.response?.data || 'Có lỗi sảy ra!'))
    }
}

const archive = async(axiosInstance, user_id, access_token, dispatch) => {
    try {
        dispatch(archiveStart())
        const results = await axiosInstance.get(`${URL_HOST}/product/draft/all`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(archiveSuccess(results.data))
    } catch (error) {
        dispatch(archiveFailed())
    }
}

const published = async(axiosInstance, user_id, access_token, dispatch) => {
    try {
        dispatch(publishedStart())
        const results = await axiosInstance.get(`${URL_HOST}/product/published/all`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(publishedSuccess(results.data))
    } catch (error) {
        dispatch(publishedFailed())
    }
}

const publish = async(axiosInstance, product_id, user_id, access_token, dispatch) => {
    try {
        dispatch(publishStart())
        const result = await axiosInstance.patch(`${URL_HOST}/product/publish/${product_id}`, " ", {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(publishSuccess(result.data))
    } catch (error) {
        dispatch(publishFailed(error.response.message || 'Có lỗi sảy ra'))
    }
}

const unPublish = async(axiosInstance, product_id, user_id, access_token, dispatch) => {
    try {
        dispatch(unPublishStart())
        const result = await axiosInstance.patch(`${URL_HOST}/product/unpublish/${product_id}`, " ", {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(unPublishSuccess(result.data))
    } catch (error) {
        dispatch(unPublishFailed(error.response.message || 'Có lỗi sảy ra'))
    }
}

const deleteProduct = async(axiosInstance, product_id, user_id, access_token, dispatch) => {
    try {
        dispatch(deleteStart())
        await axiosInstance.delete(`${URL_HOST}/product/${product_id}`, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(deleteSuccess())
    } catch (error) {
        dispatch(deleteFailed(error.response.message || 'Có lỗi sảy ra'))
    }
}

const getProducts = async(type, minPrice, maxPrice, dispatch, page = 1) => {
    try {
        dispatch(getProductStart())
        let url = `${URL_HOST}/product?page=${page}`
        if(type) url = `${URL_HOST}/product?page=${page}&type=${type}`
        if(minPrice && maxPrice) url = `${URL_HOST}/product?page=${page}&type=${type}&giatu=${minPrice}&den=${maxPrice}`
        const results = await axios.get(url)
        dispatch(getProductSuccess(results.data))
    } catch (error) {
        dispatch(getProductFailed())
    }
}

const detail = async(product_id, dispatch) => {
    try {
        dispatch(detailStart())
        const result = await axios.get(`${URL_HOST}/product/detail/${product_id}`)
        dispatch(detailSuccess(result.data))
    } catch (error) {
        dispatch(detailFailed())
    }
}

const getSimilarProduct = async(product_id, dispatch) => {
    try {
        dispatch(similarStart())
        const results = await axios.get(`${URL_HOST}/product/similar/${product_id}`)
        dispatch(similarSuccess(results.data))
    } catch (error) {
        dispatch(similarFailed())
    }
}

const search = async(query, dispatch) => {
    try {
        dispatch(searchStart())
        const results = await axios.get(`${URL_HOST}/product/search?q=${query}`)
        dispatch(searchSuccess(results.data))
    } catch (error) {
        dispatch(searchFailed())
    }
}

const favorite = async(axiosInstance, user_id, access_token, product_id, dispatch) => {
    try {
        dispatch(favoriteStart())
        // await axiosInstance.
    } catch (error) {
        dispatch(favoriteFailed())
    }
}

export { create, archive, publish, getProducts, published, unPublish, deleteProduct, detail, getSimilarProduct, search, favorite }