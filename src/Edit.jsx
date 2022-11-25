import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const [firstName, setFirstNam] = useState('');
  const [secondName, setSecondNam] = useState('');
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate()

  const getInfo = async () => {
    const { data } = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    setFirstNam(data?.contact.firstName)
    setSecondNam(data?.contact.secondName)
    console.log(data.contact);
  };

  const apiUpdate = async(userData) => {
    const {data} = await axios.patch(`http://go.contact.mmeducare.com/api/v1/contacts/${id}`, userData, {
        headers: {
            authorization: `Bearer ${user.token}`
        }
    })
    // console.log(data);
    if(data) {
        navigate('/dashboard')
    }
  }
  const onSubmitHandler = e => {
    e.preventDefault();
    apiUpdate({firstName, secondName});
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="col-6">
      <h1 className="my-3">Edit Contact</h1>
      <input
        type="text"
        placeholder="First Name"
        className="form-control my-3"
        defaultValue={firstName}
        onChange={e => setFirstNam(e.target.value)}
      />
      <input
        type="text"
        placeholder="Second Name"
        className="form-control my-3"
        defaultValue={secondName}
        onChange={e => setSecondNam(e.target.value)}

      />
      <button type="submit" className="btn btn-success">
        update
      </button>
    </form>
  );
};

export default Edit;
