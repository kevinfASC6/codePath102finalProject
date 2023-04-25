import React from 'react'; 
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
  return ( 
    <div>
    <div className='header'>
      <h1 className='header-logo'>ChessTalk</h1>
      <div>
        <input type="text" placeholder='Search' className='header-search' />
        <button className='header-btn'>Search</button>
      </div>
      <div className='actions-div'>
        <Link to="/" className="header-left">Home</Link>
        <Link to="/create" className="header-left">Create Post</Link> 
      </div>   
      </div> 
      <div> 
      <Outlet /> 
      </div>
    </div>
  )
}

export default Header;
