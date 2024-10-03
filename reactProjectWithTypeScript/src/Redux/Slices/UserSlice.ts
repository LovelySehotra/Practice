import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../lib/app-client"
const initialState={
    data:{}
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signup.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action.payload);
            return{
                ...state,data:action?.payload
            }
        })
    }
})
export const signup = createAsyncThunk("/signup",async(data)=>{
    try {
     const res  = apiClient.post("/signup",data);
     return (await res).data
    } catch (error) {
     console.log(error)
    }
 })
export default userSlice.reducer;