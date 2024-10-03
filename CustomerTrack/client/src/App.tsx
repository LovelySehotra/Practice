import React, { useEffect, useState } from "react";
import CustomerForm from "./Components/CustomerForm/CustomerForm";
import CustomerList from "./Components/CustomerList/CustomerList";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "./Redux/Slices/CustomerSlice";

const App: React.FC = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state?.customer)
  useEffect(() => {
    //@ts-ignore
    dispatch(getAllCustomers());
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Customer Management</h1>

      {/* Customer Form */}
      <CustomerForm />
      {data.customers && data.customers.length > 0 ? 
  data.customers.map((el: any) => (
    // Return the JSX from map
    <CustomerList key={el._id} customers={{...el}} />
  )) 
  : <h1>No Customers</h1>
}
    </div>
  );
};

export default App;
