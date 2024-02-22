import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        my_cart:{
            cart:null,
            isFetching:false,
            error:false
        },
        deleteProduct:{
            product:null,
            isFetching:false,
            error:false
        },
        addToCart:{
            product:null,
            isFetching:false,
            error:false
        },
        updateQuantityProduct:{
            product:null,
            isFetching:false,
            error:false
        },
        products_ordered:{
            products:[],
        }
    },
    reducers:{
        getMyCartStart:(state) => {
            state.my_cart.isFetching = true
            state.my_cart.error = false
        },
        getMyCartSuccess:(state, action) => {
            state.my_cart.isFetching = false
            state.my_cart.cart = action.payload
            state.my_cart.error = false
        },
        getMyCartFailed:(state) => {
            state.my_cart.isFetching = false
            state.my_cart.error = true
        },

        //xóa sản phẩm ra khỏi của giỏ hàng
        deleteProductOfCartStart:(state) => {
            state.deleteProduct.isFetching = true
            state.deleteProduct.error = false
        },
        deleteProductOfCartSuccess:(state, action) => {
            state.deleteProduct.isFetching = false
            state.deleteProduct.product = action.payload
            state.deleteProduct.error = false
        },
        deleteProductOfCartFailed:(state) => {
            state.deleteProduct.isFetching = false
            state.deleteProduct.error = true
        },

        //thêm sản phẩm vào giỏ hàng
        addToCartStart:(state) => {
            state.addToCart.isFetching = true
            state.addToCart.error = false
        },
        addToCartSuccess:(state, action) => {
            state.addToCart.isFetching = false
            state.addToCart.product = action.payload
            state.addToCart.error = false
        },
        addToCartFailed:(state) => {
            state.addToCart.isFetching = false
            state.addToCart.error = true
        },

        //cập nhật số lượng sản phẩm khi ấn nút + or - của sản phẩm trong giỏ hàng
        updateQuantityProductStart:(state) => {
            state.updateQuantityProduct.isFetching = true
            state.updateQuantityProduct.error = false
        },
        updateQuantityProductSuccess:(state, action) => {
            state.updateQuantityProduct.isFetching = false
            state.updateQuantityProduct.product = action.payload
            state.updateQuantityProduct.error = false
        },
        updateQuantityProductFailed:(state) => {
            state.updateQuantityProduct.isFetching = false
            state.updateQuantityProduct.error = true
        },

        productOrderedPush: (state, action) => {
            state.products_ordered.products.push(action.payload)
        },
        productOrderedPull: (state, action) => {
            state.products_ordered.products = state.products_ordered.products.filter(product => product.product_id !== action.payload.product_id)
        },
        productOrderdData:(state, action) => {
            state.products_ordered.products = action.payload
        }
    }
})

export const {
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
    updateQuantityProductFailed,
    productOrderedPull,
    productOrderedPush,
    productOrderdData
} = cartSlice.actions
export default cartSlice.reducer
