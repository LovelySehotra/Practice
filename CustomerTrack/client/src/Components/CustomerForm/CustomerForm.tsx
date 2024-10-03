import React, { useState } from "react";
import { Customer } from "../../types";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../Redux/Slices/CustomerSlice";


const CustomerForm = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"Gold" | "Diamond">("Gold");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerData: Customer = { 
      id: "",  
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      status 
    };

  //@ts-ignore

    dispatch(createCustomer(customerData));

    // Clear form after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setStatus("Gold");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Full Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value as "Gold" | "Diamond")}
        >
          <option value="Gold">Gold</option>
          <option value="Diamond">Diamond</option>
        </select>
        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
