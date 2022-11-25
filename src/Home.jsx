import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/login"><button className="btn btn-primary m-3">Login</button></Link>
      <Link to="register"><button className="btn btn-success m-3">Register</button></Link>
    </div>
  )
}

export default Home
