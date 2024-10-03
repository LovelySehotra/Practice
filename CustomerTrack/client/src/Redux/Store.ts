import {configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "./Slices/CustomerSlice";


const store = configureStore({
    reducer:{
        customer:CustomerSlice
    },
    devTools:true
})
export default store;