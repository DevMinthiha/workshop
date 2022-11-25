import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './services/userSlice';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  const [contacts, setContacts] = useState([]);
  const [num, setNum] = useState(1);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout(null));
    navigate('/login');
  };

  const getContacts = async () => {
    const { data } = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts?page=${num}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    setContacts(data.links.first);
    setContacts(data.data);
    // console.log(data);
    // console.log(data.data);
  };
  const apiDelete = async (id) => {
    const { data } = await axios.delete(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (data.data) {
      getContacts();
    }
    console.log(data);
  };
  const searchByName = async () => {
    const { data } = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts?search=${name}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data) {
      setContacts(data?.data);
    } else {
      getContacts();
    }
    console.log(data);
  };
  const nextPage = async () => {
    if (contacts.length) {
      setNum((prev) => prev + 1);
    }
  };
  const prevPage = async () => {
    if (num >= 2) {
      setNum((prev) => prev - 1);
    }
  };
  useEffect(() => {
    getContacts();
  }, [num]);
  useEffect(() => {
    searchByName();
    setNum(1)
  }, [name]);
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{user?.auth?.name}</h3>
      <button onClick={logoutHandler} className="btn btn-outline-danger">
        logout
      </button>{' '}
      <br />
      <Link to="/create">
        <button className="btn btn-primary my-3">Create New Contact</button>
      </Link>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
      />
      <table className="table py-5">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>email</th>
            <th>phone</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {!contacts.length && (
            <tr>
              <td>NO COntacts</td>
            </tr>
          )}
          {contacts?.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.contactPhoto}
                  width="30px"
                  height={'30px'}
                  className="rounded-circle"
                  alt=""
                />
              </td>
              <td>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit/${contact.id}`}>
                  <button className="btn text-success">
                    <AiFillEdit />
                  </button>
                </Link>
                <button
                  onClick={() => apiDelete(contact.id)}
                  className="btn text-danger"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {num && (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={prevPage}>
            prev
          </button>
          <small>{num}</small>
          <button className="btn btn-outline-primary btn-sm" onClick={nextPage}>
            next
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
