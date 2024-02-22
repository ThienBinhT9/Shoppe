import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice'
import userSlice from './userSlice'
import productSlice from './productSlice'
import discountSlice from './discountSlice'
import cartSlice from './cartSlice'
import checkoutSlice from './checkoutSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:['user','product','discount','cart']
}

const rootReducer = combineReducers({
    auth:authSlice,
    user:userSlice,
    product:productSlice,
    discount:discountSlice,
    cart:cartSlice,
    checkout:checkoutSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
  
let persistor = persistStore(store)

export { persistor }
export default store
