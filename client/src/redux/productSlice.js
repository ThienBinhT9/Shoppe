import { createSlice } from '@reduxjs/toolkit'

export const ProductSlice = createSlice({
    name:'product',
    initialState:{
        archive:{
            _products:null,
            isFetching:false,
            error:false
        },
        published:{
            _products:null,
            isFetching:false,
            error:false
        },
        create:{
            _products:null,
            isFetching:false,
            error:false,
            message:""
        },
        publish:{
            isFetching:false,
            error:false,
            message:""
        },
        unPublish:{
            isFetching:false,
            error:false,
            message:""
        },
        getProducts:{
            _products:null,
            isFetching:false,
            error:false
        },
        delete:{
            isFetching:false,
            error:false
        },
        detail:{
            _product:null,
            isFetching:false,
            error:false
        },
        similar:{
            _products:null,
            isFetching:false,
            error:false
        },
        search:{
            _products:null,
            isFetching:false,
            error:false
        },
        favorite:{
            isFetching:false,
            error:false
        },
    },
    reducers:{
        createStart:(state) => {
            state.create.isFetching = true
        },
        createSuccess:(state, action) => {
            state.create.isFetching = false
            state.create._products = action.payload
            state.create.error = false
        },
        createFailed: (state, action) => {
            state.create.isFetching = false
            state.create.message = action.payload
            state.create.error = true
        },

        archiveStart: (state) => {
            state.archive.isFetching = true
        },
        archiveSuccess: (state, action) => {
            state.archive._products = action.payload
            state.archive.isFetching = false
        },
        archiveFailed: (state) => {
            state.archive.isFetching = false
            state.archive.error = true
        },
         
        /////////////////
        publishedStart: (state) => {
            state.published.isFetching = true
        },
        publishedSuccess: (state, action) => {
            state.published._products = action.payload
            state.published.isFetching = false
        },
        publishedFailed: (state) => {
            state.published.isFetching = false
            state.published.error = true
        },

        /////////////////
        publishStart: (state) => {
            state.publish.isFetching = true
        },
        publishSuccess: (state, action) => {
            state.publish.message = action.payload
            state.publish.isFetching = false
        },
        publishFailed: (state, action) => {
            state.publish.isFetching = false
            state.publish.message = action.payload
        },

        /////////////////
        unPublishStart: (state) => {
            state.unPublish.isFetching = true
        },
        unPublishSuccess: (state, action) => {
            state.unPublish.isFetching = false
            state.unPublish.message = action.payload
        },
        unPublishFailed: (state, action) => {
            state.unPublish.isFetching = false
            state.unPublish.error = true
            state.unPublish.message = action.payload
        },

        /////////////////
        getProductStart:(state) => {
            state.getProducts.isFetching = true
        },
        getProductSuccess:(state, action) => {
            state.getProducts.isFetching = false
            state.getProducts._products = action.payload
        },
        getProductFailed:(state) => {
            state.getProducts.isFetching = false
            state.getProducts.error = true
        },

        /////////////////
        deleteStart:(state) => {
            state.delete.isFetching = true
            state.delete.error = false
        },
        deleteSuccess:(state) => {
            state.delete.isFetching = false
            state.delete.error = false
        },
        deleteFailed:(state) => {
            state.delete.isFetching = false
            state.delete.error = true
        },

        /////////////////
        detailStart:(state) => {
            state.detail.isFetching = true
            state.detail.error = false
        },
        detailSuccess:(state, action) => {
            state.detail.isFetching = false
            state.detail.error = false
            state.detail._product = action.payload
        },
        detailFailed:(state) => {
            state.detail.isFetching = false
            state.detail.error = true
        },

        /////////////////
        similarStart:(state) => {
            state.similar.isFetching = true
            state.similar.error = false
        },
        similarSuccess:(state, action) => {
            state.similar.isFetching = false
            state.similar._products = action.payload
            state.similar.error = false
        },
        similarFailed:(state) => {
            state.similar.isFetching = false
            state.similar.error = true
        },

        /////////////////
        searchStart:(state) => {
            state.search.isFetching = true
            state.search.error = false
        },
        searchSuccess:(state, action) => {
            state.search.isFetching = false
            state.search._products = action.payload
            state.search.error = false
        },
        searchFailed:(state) => {
            state.search.isFetching = false
            state.search.error = true
        },

        /////////////////
        favoriteStart:(state) => {
            state.favorite.isFetching = true
            state.favorite.error = false
        },
        favoriteSuccess:(state) => {
            state.favorite.isFetching = false
            state.favorite.error = false
        },
        favoriteFailed:(state) => {
            state.favorite.isFetching = false
            state.favorite.error = true
        },
    }
})


export const {
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
    favoriteFailed,
} = ProductSlice.actions
export default ProductSlice.reducer