import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Layout/Hero'
import BookCollectionSection from '../components/Products/BookCollectionSection'
import Newarrivals from '../components/Products/Newarrivals';
import ProductDetail from '../components/Products/ProductDetail';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSection from '../components/Products/FeaturedSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters, fetchProductDetails } from '../redux/slices/productsSlice';

// const placeholderProducts = [
//   {
//     _id: 1,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=1",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 2,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=2",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 3,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=3",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 4,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=4",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 5,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=5",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 6,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=6",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 7,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=7",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   },
//   {
//     _id: 8,
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=8",
//         alt: "The Alchemist Book Cover"
//       }
//     ]
//   }
// ]


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      category: "Best Seller",
      sort: "-rating",
      limit: 8,
    }));

    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
        if (response.data?._id) {
          dispatch(fetchProductDetails({ id: response.data._id }));
        }
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };
  
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero/>
      <BookCollectionSection/>
      <Newarrivals/>
      {/*Best Seller*/}
      <h2 className='text-3xl font-bold text-center mb-4'>Best Sellers</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetail productId={bestSellerProduct._id}/>
      ) : (
        <p className='text-center'>Loading best seller products...</p>
      )}
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Top Rated
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
      <FeaturedSection/>
    </div>
  )
}

export default Home