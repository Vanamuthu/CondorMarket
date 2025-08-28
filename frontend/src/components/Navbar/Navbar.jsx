import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartItem} = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Condor Market</p>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </div>
      <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => { setMenu("home"); setIsMenuOpen(false); }}>
            <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
            {menu === "home" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("mens"); setIsMenuOpen(false); }}>
            <Link style={{ textDecoration: 'none' }} to='/mens'>Men's</Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("womens"); setIsMenuOpen(false); }}>
            <Link style={{ textDecoration: 'none' }} to='/womens'>Women's</Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("electronics"); setIsMenuOpen(false); }}>
            <Link style={{ textDecoration: 'none' }} to='/electronics'>Electronics</Link>
            {menu === "electronics" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ? <button className="logout-btn" onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
          : <Link to='/login'><button className="login-btn">Login</button></Link>}
          <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItem()}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
