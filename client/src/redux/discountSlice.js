import {createSlice} from '@reduxjs/toolkit'

export const DiscountSlice = createSlice({
    name:'discount',
    initialState:{
        create_discount:{
            discount:null,
            isFetching:false,
            error:false
        },
        get_yourShop_discount_created:{
            discounts:null,
            isFetching:false,
            error:false
        },
        delete_discount:{
            discount:null,
            message:'',
            isFetching:false,
            error:false
        },
        getDiscountValidOfShop:{
            discounts:null,
            isFetching:false,
            error:false
        }

    },
    reducers:{

        //create
        createDiscountStart:(state) => {
            state.create_discount.isFetching = true
            state.create_discount.error = false
        },
        createDiscountSuccess:(state, action) => {
            state.create_discount.isFetching = false
            state.create_discount.discount = action.payload
            state.create_discount.error = false
        },
        createDiscountFailed:(state) => {
            state.create_discount.isFetching = false
            state.create_discount.error = true
        },

        //get your shop discount created
        getYourShopCreatedStart:(state) => {
            state.get_yourShop_discount_created.isFetching = true
            state.get_yourShop_discount_created.error = false
        },
        getYourShopCreatedSuccess:(state, action) => {
            state.get_yourShop_discount_created.isFetching = false
            state.get_yourShop_discount_created.discounts = action.payload
            state.get_yourShop_discount_created.error = false
        },
        getYourShopCreatedFailed:(state) => {
            state.get_yourShop_discount_created.isFetching = false
            state.get_yourShop_discount_created.error = true
        },

        // delete discount
        deleteDiscountStart:(state) => {
            state.delete_discount.isFetching = true
            state.delete_discount.error = false
        },
        deleteDiscountSuccess:(state, action) => {
            state.delete_discount.isFetching = false
            state.delete_discount.discount = action.payload
            state.delete_discount.error = false
        },
        deleteDiscountFailed:(state, action) => {
            state.delete_discount.isFetching = false
            state.delete_discount.message = action.payload
            state.delete_discount.error = true
        },

        //user get discount của shop hợp lệ với sản phẩm cần mua
        getDiscountValidOfShopStart:(state) => {
            state.getDiscountValidOfShop.isFetching = true
            state.getDiscountValidOfShop.error = false
        },
        getDiscountValidOfShopSuccess:(state, action) => {
            state.getDiscountValidOfShop.isFetching = false
            state.getDiscountValidOfShop.discounts = action.payload
            state.getDiscountValidOfShop.error = false
        },
        getDiscountValidOfShopFailed:(state) => {
            state.getDiscountValidOfShop.isFetching = false
            state.getDiscountValidOfShop.error = true
        },
        
    }
})

export const {
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
} = DiscountSlice.actions
export default DiscountSlice.reducer