import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const user = useSelector((state) => state.user.value);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  const apiCreateContact = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('secondName', secondName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('contactPhoto', photo);
    const { data } = await axios.post(
      'http://go.contact.mmeducare.com/api/v1/contacts',
      formData,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    if(data.success) {
        navigate('/dashboard')
    }
    console.log(data);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiCreateContact();
    console.log(firstName, secondName, email, phone, photo);
  };
  return (
    <form onSubmit={onSubmitHandler} className="col-6 my-5">
      <h1>Create New Contact</h1>
      <input
        type="text"
        placeholder="First Name"
        className="form-control my-3"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Second Name"
        className="form-control my-3"
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="form-control my-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Phone"
        className="form-control my-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="file"
        className="form-control my-3"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit" className="btn btn-primary btn-sm my-3">
        create
      </button>
    </form>
  );
};

export default Create;
