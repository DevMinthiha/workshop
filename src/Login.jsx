import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './services/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiLogin = async () => {
    const { data } = await axios.post(
      'http://go.contact.mmeducare.com/api/v1/login',
      { email, password }
    );
    console.log(data);
    dispatch(login(data));
    if (data?.success) {
      if(isChecked) {
        localStorage.setItem("account", JSON.stringify({email, password}))
      } else {
        localStorage.removeItem("account")
      }
      navigate('/dashboard');
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (isChecked) {
      localStorage.setItem('account', JSON.stringify({ email, password }));
    } 
    apiLogin();
  };

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    console.log(account);
    if(account) {
      setIsChecked(true)
      setEmail(account?.email)
      setPassword(account?.password)
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className="col-6">
      <h1>Login Account</h1>
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
      <div className="d-flex align-items-center my-3 gap-2">
        <input
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
        />
        <small>Remember Me</small>
      </div>
      <button type="submit" className="btn btn-primary">
        login
      </button>
    </form>
  );
};

export default Login;
