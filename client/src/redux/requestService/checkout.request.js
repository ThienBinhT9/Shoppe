import {reviewCheckoutStart, reviewCheckoutSuccess, reviewCheckoutFailed} from '../checkoutSlice'

let URL_HOST = 'http://localhost:8000'

const checkoutReview = async(axiosInstance, user_id, access_token, body, dispatch) => {
    try {
        dispatch(reviewCheckoutStart())
        const result = await axiosInstance.post(`${URL_HOST}/checkout/review`, body, {
            headers:{
                'x-client-id':user_id,
                access_token
            }
        })
        dispatch(reviewCheckoutSuccess(result.data))
    } catch (error) {
        dispatch(reviewCheckoutFailed())
    }
}

export {checkoutReview}