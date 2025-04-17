import React from 'react'
import { Link } from 'react-router-dom'
import main_book from '../../assets/main-book.jpg'
const Hero = () => {
  return (
    <section className='relative'>
        <img src={main_book} alt='hero' className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
        <div className='absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center'>
            <div className='text-white text-center p-6'>
                <h1 className='text-4xl md:text-9xl font-bold mb-4 tracking-tighter uppercase'>
                    Welcome to our website
                    <br/>
                    <span className='text-sm md:text-lg mb-6 tracking-tighter'>
                        Your one-stop shop
                    </span>
                    <Link to='/products' className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
                        Shop Now
                    </Link>
                </h1>
                <p className='text-xl md:text-2xl mb-8'>
                    Discover the best products and services
                </p>
            </div>
        </div>
    </section>
  )
}

export default Hero
