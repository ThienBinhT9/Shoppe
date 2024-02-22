import {createSlice} from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name:'checkout',
    initialState:{
        reviewCheckout:{
            checkout:null,
            isFetching:false,
            error:false
        }
    },
    reducers:{
        reviewCheckoutStart:(state) => {
            state.reviewCheckout.isFetching = true
            state.reviewCheckout.error = false
        },
        reviewCheckoutSuccess:(state, action) => {
            state.reviewCheckout.isFetching = false
            state.reviewCheckout.checkout = action.payload
            state.reviewCheckout.error = false
        },
        reviewCheckoutFailed:(state) => {
            state.reviewCheckout.isFetching = false
            state.reviewCheckout.error = true
        },
    }
})

export const {reviewCheckoutStart, reviewCheckoutSuccess, reviewCheckoutFailed} = checkoutSlice.actions
export default checkoutSlice.reducer