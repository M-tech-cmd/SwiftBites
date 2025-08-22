import React from 'react';
import './Header.css';

// The Header component needs to accept 'menu' and 'setMenu' as props.
const Header = ({ menu, setMenu }) => {
  return (
    <div className='header'>
      <div className="header-overlay"></div>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with
          the finest ingredients and culinary expertise.
        </p>
        <a 
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className='view-menu-btn'
        >
          View Menu
        </a>
      </div>
    </div>
  );
};

export default Header;