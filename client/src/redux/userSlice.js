import { createSlice } from '@reduxjs/toolkit'


export const UserSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        systemShop:{
            shops:null,
            isFetching:false,
            error:false
        }
    },
    reducers:{
        systemShopStart:(state) =>{
            state.systemShop.isFetching = true
        },
        systemShopSuccess:(state, action) => {
            state.systemShop.isFetching = false
            state.systemShop.shops = action.payload
        },
        systemShopFailed:(state) => {
            state.systemShop.isFetching = false
            state.systemShop.error = true
        }
    }
})

export const {updateUserStart, updateUserSuccess, updateUserFailed, systemShopStart, systemShopSuccess, systemShopFailed}  = UserSlice.actions
export default UserSlice.reducer