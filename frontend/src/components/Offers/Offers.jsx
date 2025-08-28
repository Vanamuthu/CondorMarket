import React from 'react'
import './Offers.css'
import { Link } from 'react-router-dom';
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>only on Best Sellers</p>
            <button><Link style={{ textDecoration: 'none', color:'white'}} to='/womens'>Check Now</Link></button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers