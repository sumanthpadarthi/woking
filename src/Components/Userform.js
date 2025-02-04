import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './UserForm.css';

const UserForm = () => {
  const initialState = {
    name: '',
    address: '',
    email: '',
    phone: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      id: uuidv4(),
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem('userData') || '[]');
    localStorage.setItem('userData', JSON.stringify([...existingData, userData]));

    // Reset form
    setFormData(initialState);
    setIsDirty(false);
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
