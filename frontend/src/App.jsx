import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

import { Toaster } from 'sonner'
import CollectionPage from './pages/CollectionPage'
import Checkout from './components/cart/Checkout'
import ProductDetail from './components/Products/ProductDetail'
import OrdersDetailPage from './pages/OrdersDetailPage'
import MyOrdersPages from './pages/MyordersPages'
import AdminLayout from './components/admin/AdminLayout'
import AdminHomepage from './pages/AdminHomepage'
import UserManagement from './components/admin/UserManagement'
import ProductManagement from './components/admin/ProductManagement'
import EditProductPage from './components/admin/EditProductPage'
import OrderManagement from './components/admin/OrderManagement'
import AboutUs from './pages/AboutUs'

import {Provider} from 'react-redux';
import store from './redux/store';
import ProtectedRoute from './components/common/ProtectedRoute'

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes>
      <Route path="/" element={<UserLayout />}>
        {/* User Layout */}
        <Route index element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='collections/:collection' element={<CollectionPage/>} />
        <Route path='product/:id' element={<ProductDetail/>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path='checkout' element={<Checkout/>} />
        <Route path='order-confirmation' element={<OrderConfirmationPage/>} />
        <Route path='order/:id' element={<OrdersDetailPage/>} />
        <Route path='my-orders' element={<MyOrdersPages/>} />
        <Route path='/admin' element={
          <ProtectedRoute role="admin">
          <AdminLayout/>
          </ProtectedRoute>}>{ /* Admin Layout */}
        <Route index element={<AdminHomepage/>} />
        <Route path='users' element={<UserManagement/>} />
        <Route path='products' element={<ProductManagement/>}/>
        <Route path='products/:id/edit' element={<EditProductPage/>}/>
        <Route path='orders' element={<OrderManagement/>}/>
        <Route path='aboutus' element={<AboutUs/>} />
        
        </Route>
        
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
