import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { TbBrandMeta, TbPhoneCall } from 'react-icons/tb'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t py-12' >
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 lg:px-0'>
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-500 mb-4'>
            Be the first to know about new arrivals, sales & promos!
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6 '>
            Sign Up and get 10% off your first order.
          </p>
          {/*Newsletter form*/}
          <form className='flex'>
              <input type="email" placeholder='Enter your email' className='p-3 w-full text-sm border-t border-b border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'/>
              <button type='Submit' className='bg-black text-white px-6 py-2 rounded-r-md text-sm hover:bg-gray-800 transition-all'>
               Subscibe
              </button>
          </form>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              Book 
              </Link>
            </li>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              Author
              </Link>
            </li>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              All Books
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              Contact Us
              </Link>
            </li>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              About Us
              </Link>
            </li>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to='#' className='text-gray-500 hover:text-gray-500 transition-colors'>
              Privacy Policy
              </Link>
            </li>
            </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
          <div className='flex items-center mb-6 space-x-4'>
            <a href='https://www.facebook.com' target='_blank' rel="nooperner norefeffer " className='text-gray-500 hover:text-gray-300 transition-colors'>
              <TbBrandMeta className='h-5 w-5' />
            </a>
            <a href='https://www.instagram.com' target='_blank' rel="nooperner norefeffer " className='text-gray-500 hover:text-gray-300 transition-colors'>
              <IoLogoInstagram className='h-5 w-5' />
            </a>
            <a href='https://www.twitter.com' target='_blank' rel="nooperner norefeffer " className='text-gray-500 hover:text-gray-300 transition-colors'>
              <RiTwitterXLine className='h-4 w-4' />
            </a>
          </div>
          <p className='text-gray-500'>
            Call Us </p>
            <p>
            <TbPhoneCall className='inline-block mr-2'/>
            +91-6299760879
            </p>
          </div>
          </div>
          {/*Footer bottom*/}
          <div className= ' container mx-auto mt-12 px-4 lg:px-0 bottom-t border-gray-200 pt-6'>
           <p className='text-sm text-gray-500 text-center tracking-tighter'> &copy; 2025 BookStore. All rights reserved.</p>
          </div>
    </footer>
  )
}

export default Footer
