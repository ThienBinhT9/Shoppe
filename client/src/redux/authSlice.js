import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        current_user:null,
        register:{
            isFetching:false,
            error:false,
            message:''
        },
        login:{
            isFetching:false,
            error:false,
            message:''
        },
        logout:{
            isFetching:false,
            error:false
        },
        updateUser:{
            isFetching:false,
            error:false,
            message:''
        }
    },

    reducers:{
        //REGISTER
        registerStart:(state) => {
            state.register.isFetching = true
            state.register.error = false
        },
        registerSuccess:(state, action) => {
            state.register.isFetching = false
            state.current_user = action.payload
            state.register.error = false
        },
        registerFailed:(state, action) => {
            state.register.isFetching = false
            state.register.error = true
            state.register.message = action.payload
        },

        //LOGIN
        loginStart:(state) => {
            state.login.isFetching = true
            state.login.error = false
        },
        loginSuccess:(state, action) => {
            state.login.isFetching = false
            state.current_user = action.payload
            state.login.error = false
        },
        loginFailed:(state, action) => {
            state.login.isFetching = false
            state.login.error = true
            state.login.message = action.payload
        },

        //LOGOUT
        logoutStart:(state) => {
            state.logout.isFetching = true
            state.logout.error = false
        },
        logoutSuccess:(state) => {
            state.logout.isFetching = false
            state.logout.error = false
            state.current_user = null
        },
        logoutFailed:(state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },

        //CONFIRM SALES
        updateUserStart:(state) => {
            state.updateUser.isFetching = true
            state.updateUser.error = false
        },
        updateUserSuccess:(state, action) => {
            state.updateUser.isFetching = false
            state.current_user =  action.payload
            state.updateUser.error = false
        },
        updateUserFailed:(state,action) => {
            state.updateUser.isFetching = false
            state.updateUser.error = true
            state.updateUser.message = action.payload
        },
    }
})

export const {
    registerStart, 
    registerSuccess, 
    registerFailed, 
    loginStart, 
    loginSuccess, 
    loginFailed, 
    logoutStart, 
    logoutSuccess, 
    logoutFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed
} = authSlice.actions
export default authSlice.reducer