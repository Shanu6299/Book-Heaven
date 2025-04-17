import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import PayPalButton from './PayPalButton'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice'
import axios from 'axios'
import { useEffect } from 'react'

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
   const [shippingAddress, setShippingAddress] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    phone: '',
    country: 'United States'
  });

  // Ensure cart is loading before rendering
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleCartCheckOut = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(createCheckout(
        {
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: 'paypal',
          totalPrice: cart.totalPrice,
          isPaid: false,
          paidAt: null,
        }
      ));
      if(res.payload && res.payload._id) {
        setCheckoutId(res.payload._id)
      }
    }
  };
  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {paymentStatus: 'paid', paymentDetails: details, paymentMethod: 'paypal'},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          } 
        }
      );

       await handleFinalisedCheckout(checkoutId);  // Handle finalised checkout

    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  const handleFinalisedCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalise`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        }
      ); 

        navigate('/order-confirmation');
  } catch (error) {
    console.error('Error finalising checkout:', error); 
  }
};

  if (loading) {
    return <div>Loading Cart...</div>;  
  }
  if (error) {
    return <div>Error loading cart: {error}</div>; 
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return <div>No items in the cart.</div>; 
  }

  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='flex'>
      {/* Left Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleCartCheckOut} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
          <h2 className='text-2xl font-bold text-center mb-4 text-gray-800 uppercase'>Checkout</h2>
          
          {/* Contact Details */}
          <div className='mb-4'>
            <h3 className='text-lg font-semibold mb-4'>Contact Details</h3>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm text-gray-700 font-semibold mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={user? user.email : ""}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-4'>Delivery</h3>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label htmlFor='firstName' className='block text-sm text-gray-700 font-semibold mb-2'>First name</label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={shippingAddress.firstName}
                  onChange={handleChange}
                  className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                />
              </div>
              <div>
                <label htmlFor='lastName' className='block text-sm text-gray-700 font-semibold mb-2'>Last name</label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={shippingAddress.lastName}
                  onChange={handleChange}
                  className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                />
              </div>
            </div>

            <div className='mb-4'>
              <label htmlFor='address' className='block text-sm text-gray-700 font-semibold mb-2'>Address</label>
              <input
                type='text'
                id='address'
                name='address'
                value={shippingAddress.address}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
              />
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label htmlFor='city' className='block text-sm text-gray-700 font-semibold mb-2'>City</label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                />
              </div>
              <div>
                <label htmlFor='postalCode' className='block text-sm text-gray-700 font-semibold mb-2'>Postal Code</label>
                <input
                  type='text'
                  id='postalCode'
                  name='postalCode'
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                  className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
                />
              </div>
            </div>

            <div className='mb-4'>
              <label htmlFor='state' className='block text-sm text-gray-700 font-semibold mb-2'>State</label>
              <input
                type='text'
                id='state'
                name='state'
                value={shippingAddress.state}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='phone' className='block text-sm text-gray-700 font-semibold mb-2'>Phone</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={shippingAddress.phone}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
              />
            </div>
          </div>

          <div className='mt-6'>
            {!checkoutId ?(
          <button
            type='submit'
            className='w-full bg-black text-white font-semibold py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all'
          >
            Continue to Payment
          </button>
          ):<div>
            <h3 className='text-lg mb-4'>
                Pay with Paypal </h3>
                {/* Paypal Component */}
                <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} 
                onError={(err) => alert("Payment failed! Try again")} />
          </div>
            }
          </div>
        </form>
      </div>
        {/* Right Section*/}
      <div className='w-full md:w-1/2 p-6 rounded-lg bg-gray-50'>
        <h3 className='text-lg mb-4'>
            Order Summary </h3>
        <div className='border-t rounded py-4 mb-4'>
            {cartItems.map((product) => ( 
                <div key={product._id} className='flex justify-between items-start py-2 border-b'>
                    <div className='flex items-start'>
                        <img src={product.image} alt={product.name} className='w-30 h-24 object-contain mr-4' />
                        <div>
                            <h3 className='text-md'>{product.name}</h3>
                            <p className='text-sm text-gray-500'>Quantity: {product.quantity}</p>
                        </div>
                    </div>
                    <p className='text-xl'>${(product.price * product.quantity).toLocaleString()}</p>
                </div>
            ))}
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
            <p>Subtotal: </p>
            <p>${totalPrice.toLocaleString()}</p>
        </div>
        <div className='flex justify-between items-center text-lg'>
            <p>Shipping</p>
            <p>Free</p>
        </div>
        <div className='flex justify-between items-center text-lg border-t pt-4 mt-4'>
            <p>Total</p>
            <p>${totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
