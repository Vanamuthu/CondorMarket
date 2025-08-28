import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import hero_image from '../Assets/hero_image.png';
import arrow_icon from '../Assets/arrow.png';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <img src={hero_image} alt="" />
        </div>
        <div className="hero-right">
            <h2>Summer Collection</h2>
            <p>for everyone !!!</p>
            <div className="hero-latest-btn">
                <div><Link style={{ textDecoration: 'none', color:'white'}} to='/mens'>Latest Collection</Link></div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero