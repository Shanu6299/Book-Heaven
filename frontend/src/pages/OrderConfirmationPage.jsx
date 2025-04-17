import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkout from '../components/cart/Checkout';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{checkout} = useSelector((state) => state.checkout);

// Clear cart
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage
    } else {
      navigate('/my-orders');
    }
  }, [dispatch,checkout, navigate ]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // add 10 days
    return orderDate.toLocaleDateString();
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-2xl font-bold text-center text-emerald-700 mb-8'>
        Thank you for your order!
      </h1>
      {checkout && (
        <div className='p-6 rounded-lg border'>
          <div className='flex justify-between mb-8'>
            {/* Order ID and Date */}
            <div>
              <h2 className='text-xl font-semibold'>Order ID: {checkout._id}</h2>
              <p className='text-gray-500'>Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          {/* Shipping Address */}
          <div className='mb-8'>
            <h3 className='text-lg font-semibold mb-2'>Shipping Address</h3>
            <div className='text-gray-600'>
              <p>{checkout.shippingAddress.fullName}</p>
              <p>{checkout.shippingAddress.address}</p>
              <p>{checkout.shippingAddress.city}, {checkout.shippingAddress.state} {checkout.shippingAddress.postalCode}</p>
            </div>
          </div>
          
          {/* Estimated Delivery Date */}
          <div className='mb-8'>
            <p className='text-emerald-700 text-sm'>
              Estimated delivery date: {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>

          {/* Order Items */}
          <div className='mb-8'>
            <h3 className='text-lg font-semibold mb-4'>Order Items</h3>
            <div className='space-y-4'>
              {checkout.checkoutItems.map((item) => (
                <div key={item.productId} className='flex items-center gap-4 border-b pb-4'>
                  <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded mr-4' />
                  <div className='flex-1'>
                    <h4 className='font-medium'>{item.name}</h4>
                    <p className='text-gray-500'>Quantity: {item.quantity}</p>
                    <p className='text-gray-700'>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6 text-right'>
              <p className='text-lg font-semibold'>Total: ${checkout.checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
            </div>
          </div>

          {/* Payment and Delivery Info */} 
          <div className='grid grid-cols-2 gap-8'>
            {/* Payment Info */}
            <div className='bg-gray-100 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold mb-4'>Payment Information</h3>
              <p className='text-gray-600'>PayPal</p>
            </div>
            {/* Delivery Info */}
            <div className='bg-gray-100 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>Delivery Information</h3>
              <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
              <p className='text-gray-600'>
                {checkout.shippingAddress.city}, {checkout.shippingAddress.state} {checkout.shippingAddress.postalCode}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmationPage
