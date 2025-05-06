import { useState } from "react";
import './App.css';
import React from 'react';
import { v4 as uuid } from 'uuid';



function App() {


  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);


  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });


  const handleChanger = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const AddData = (e) => {
    e.preventDefault();
  

  const newErrors = {};

  if (!formData.name.trim()) newErrors.name = "Name is required.";
  if (!formData.email.trim()) newErrors.email = "Email is required.";
  if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
    if (editId) {
      // Update user
      setData((prevData) =>
        prevData.map((user) =>
          user.id === editId ? { ...formData, id: editId } : user
        )
      );
      setEditId(null);
    } else {
      // Add new user with a new ID
      setData((prevData) => [...prevData, { ...formData, id: uuid() }]);
    }
  
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: ''
    });

    setErrors({});
  };
  
  

  console.log(data);

  const handleDelete = (id) => {
    const filteredData = data.filter((user) => user.id !== id);
    setData(filteredData);
  };




  const handleEdit = (user) => {
    setFormData(user);
    setEditId(user.id);
  };
  
 
 
  
  return (
    <>
      <h2 className='heading'>CRUD-Operation</h2>
      <h3 className='heading'>User Registration Form</h3>
      <div className="form-App">
        <div className="right">

          <form onSubmit={AddData}>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChanger}
              placeholder='Enter your name'
            />
            <br />

            {errors.name && <p className="error">{errors.name}</p>}
<br />



            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChanger}
              placeholder='Enter your email'
            />
            <br />

            {errors.email && <p className="error">{errors.email}</p>}
<br />

            <label>Phone :</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChanger}
              placeholder='Enter your phone number'
            />
            <br />

            {errors.phone && <p className="error">{errors.phone}</p>}
<br />

            <button className="btn" type="submit">{editId ? 'Update' : 'Submit'}</button>

          </form>
        </div>

        <div className="left">
          <h3>Submitted Users:</h3>
           {
            data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="first-row">S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className="first-row" >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => (
                    <tr key={user.id} className="list">
                      <td className="first-row">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className="first-row">
                        <button className="edits" onClick={() => handleEdit(user)}>edit</button>
                        <button className="dlts" onClick={() => handleDelete(user.id)}>delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )
           }
          
        </div>
      </div>
    </>
  );
}

export default App;


