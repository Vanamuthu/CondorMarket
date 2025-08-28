import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Receive Exclusive offers via Email</h1>
        <p>Subscribe and stay updated</p>
        <div>
            <input type="email" placeholder='Your Email ID' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter