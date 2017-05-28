import React from 'react'
import { Link } from 'react-router-dom'

import './Page.css'

const Page = ({ children }) => (
  <div>
    <div className='header'>
      <div className='logo'>Resonant Truths</div>
      <Link to='/'>Journal</Link>
    </div>

    <div className='content'>
      {children}
    </div>
  </div>
)

export default Page
