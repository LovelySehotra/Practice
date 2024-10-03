import { useEffect, useState } from 'react';
import './CustomerList.css'; // Import the CSS file

const CustomerForm = (customer:any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState(''); 
  const [ isEditable,setIsEditable] =useState(false);
 

  const handleEdit = () => {
    console.log('Customer Edited', { firstName, lastName, email, phoneNumber, status });
    setIsEditable(false);
  };

  const handleDelete = () => {
    console.log('Customer Deleted');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setStatus('');
  };
  useEffect(()=>{
    console.log(customer)
    const { firstName: initialFirstName, lastName: initialLastName, email: initialEmail, phoneNumber: initialPhoneNumber, membershipId:{name:initialStatus}  } = customer.customers;

    setFirstName(initialFirstName|| '');
    setEmail(initialEmail);
    setLastName(initialLastName)
    setPhoneNumber(initialPhoneNumber)
    setStatus(initialStatus)
    console.log(status)
  
  },[customer])

  return (
    <div className='form-container'>
      <div className='input-container'>
        {/* Full Name Input */}
        <input
          className={`input-field ${!isEditable ? 'bg-gray-200' : ''}`}
          type="text"
          value={firstName}
          placeholder="Full Name"
          onChange={(e) => setFirstName(e.target.value)}
          readOnly={!isEditable}
        />
        
        {/* Last Name Input */}
        <input
          className={`input-field ${!isEditable ? 'bg-gray-200' : ''}`}
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          readOnly={!isEditable}
         
        />
        
        {/* Email Input */}
        <input
          className={`input-field ${!isEditable ? 'bg-gray-200' : ''}`}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditable}
        
        />
        
        {/* Phone Number Input */}
        <input
          className={`input-field ${!isEditable ? 'bg-gray-200' : ''}`}
          type="tel"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          readOnly={!isEditable}
          
        />
        
        {/* Status Dropdown */}
        <select
          className={`input-field ${!isEditable ? 'bg-gray-200' : ''}`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={!isEditable}
        >
          <option value="">Select Status</option>
          {/* Options should be fetched from the server and rendered here */}
          <option value="Gold">Gold</option>
          <option value="Diamond">Diamond</option>
        </select>

        {/* Action Buttons */}
        <div className='action-buttons'>
          <button
            className='submit-button'
           onClick={()=>{
            if(isEditable){
              handleEdit()
            }else{
              setIsEditable(true)
            }
           }}
          >
            {isEditable ? "Save" : "Edit"}
          </button>

          <button
            className='submit-button'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
