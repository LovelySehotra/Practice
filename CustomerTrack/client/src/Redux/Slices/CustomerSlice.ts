import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.ts";
import { Customer } from "../../types.ts";

let API_URL ="customer"
export const getAllCustomers = createAsyncThunk("customers/fetchAll", async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return
  }
});

export const createCustomer = createAsyncThunk("customers/create", async (customerData:Customer) => {
  try {
    const response = await axiosInstance.post(API_URL, customerData);
    return response.data;
  } catch (error) {
    console.log(error);
    return
  }
});

export const updateCustomer = createAsyncThunk("customers/update", async ( id, customerData ) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.log(error);
    return
  }
});

export const deleteCustomer = createAsyncThunk("customers/delete", async (id: any) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return
  }
});

// Slice definition
const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: []
  },
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      
      .addCase(getAllCustomers.fulfilled, (state: { status: string; customers: any; }, action: { payload: any; }) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(createCustomer.fulfilled, (state: { status: string; customers: any[]; }, action: { payload: any; }) => {
        state.status = "succeeded";
        state.customers.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state: { status: string; customers: any[]; }, action: { payload: { id: any; }; }) => {
        state.status = "succeeded";
        const index = state.customers.findIndex((customer: { id: any; }) => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state: { status: string; customers: any[]; }, action: { payload: { id: any; }; }) => {
        state.status = "succeeded";
        state.customers = state.customers.filter((customer: { id: any; }) => customer.id !== action.payload.id);
      })
  }
});

export default customersSlice.reducer;
