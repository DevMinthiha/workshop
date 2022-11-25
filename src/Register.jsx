import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('hhz');
  const [email, setEmail] = useState('hhz@gmail.com');
  const [password, setPassword] = useState('asdffdsa');
  const [confirm, setConfirm] = useState('asdffdsa');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const apiRegister = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirm);
    formData.append('userPhoto', photo);

    try{
      const { data } = await axios.post(
        'http://go.contact.mmeducare.com/api/v1/register',
        formData
      );
      if (data?.success) {
        navigate('/login');
      }
    } catch(error) {
      console.log(error.response.data.errors);
      setError(error.response.data.errors)
    }
      

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiRegister();
  };
  return (
    <form onSubmit={onSubmitHandler} className="col-6">
      <h1>Register Account</h1>
      <p>{error.email}</p>
      <p>{error.password}</p>
      <input
        type="text"
        className="form-control my-5"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="emai"
        className="form-control my-5"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="form-control my-5"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="password"
        className="form-control my-5"
        placeholder="Confirmation"
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
      />
      <input
        type="file"
        className="form-control my-5"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit" className="btn btn-success">
        register
      </button>
    </form>
  );
};

export default Register;
