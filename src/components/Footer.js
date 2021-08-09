import React from 'react';
import '../App.css';

const Footer = () => (
  <div className='main-footer mt-5'>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h4>MyStore</h4>
          <ul className='list-unstyled'>
            <li>342-420-2645</li>
            <li>San Francisco</li>
            <li>123 Street Hahay</li>
          </ul>
        </div>
        <div className='col'>
          <h4>STUFF</h4>
          <ul className='list-unstyled'>
            <li>342-420-2645</li>
            <li>San Francisco</li>
            <li>123 Street Hahay</li>
          </ul>
        </div>
        <div className='col'>
          <h4>ABOUT</h4>
          <ul className='list-unstyled'>
            <li>342-420-2645</li>
            <li>San Francisco</li>
            <li>123 Street Hahay</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className='row'>
        <p className='col-sm'>
          &copy;{new Date().getFullYear()} MyStore | All rights reserved | Terms
          of Service | Privacy
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
