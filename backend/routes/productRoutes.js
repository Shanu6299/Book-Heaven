const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect,admin } = require('../middleware/authMiddleware');
const { collection } = require('../models/User');

const router = express.Router();

// @route POST api/products
// @desc Create new product
// @access private/admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const {
           name,
           price,
           description,
           discountPrice,
           countInStock,
           sku,
           category,
           author,
           publisher,
           language,
           pages,
           format,
           isbn,
           publicationDate,
           rating,
           numReviews,
           images,
           isFeatured,
           reviews,
           tags,
           metaTitle,
           metaDescription,
           metaKeywords
       } = req.body;

       // Transform image strings into proper objects
       const formattedImages = images.map(image => ({
           url: image,
           altText: '' // Default empty alt text
       }));

       // Ensure reviews have required user field
       const formattedReviews = reviews ? reviews.map(review => ({
           ...review,
           user: review.user || req.user._id // Use current user if not specified
       })) : [];

       const product = new Product({
        name,
        price,
        description,
        discountPrice,
        countInStock,
        sku,
        category,
        author,
        publisher,
        language,
        pages,
        format,
        isbn,
        publicationDate,
        rating,
        numReviews,
        images: formattedImages,
        isFeatured,
        reviews: formattedReviews,
        tags,
        metaTitle,
        metaDescription,
        metaKeywords,
        user: req.user._id // Referencing the admin who created the product
       });

       const createdProduct = await product.save();
       res.status(201).json(createdProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });   
    }
});

// @route GET api/products
// @desc Get all products
// @access Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route GET /api/products/best-seller
// @desc Retrive best seller products with highest rating
// @access Public
router.get('/best-seller', async (req, res) => {
    try {

        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        }
        else {
            res.status(404).json({ msg: 'No best sellers found' }); 
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' }); 
    }
})

// @route GET /api/products/new-arrivals
// @desc Retrive new arrivals products with latest publication date
// @access Public
router.get('/new-arrivals', async (req, res) => {
    try {
       const newArrivals = await Product.find().sort({ publicationDate: -1 }).limit(8);
       if (newArrivals) {
        // res.json(newArrivals);
        res.json({ data: newArrivals });
       }
       else {
        res.status(404).json({ msg: 'No new arrivals found' });
       }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
    });

// @route GET api/products/similar/:id
// @desc Get similar products by id and category 
// @access Public
router.get('/similar/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: id } // Exclude the current product
        }).limit(4); // Limit to 4 similar products

        res.json(similarProducts);        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' }); 
    }
});

// @route GET api/products/:id
// @desc Get single product
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ msg: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route PUT /api/products/:id
// @desc Update product
// @access private/admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const {
            name,
            price,
            description,
            discountPrice,
            countInStock,
            sku,
            category,
            author,
            publisher,
            language,
            pages,
            format,
            isbn,
            publicationDate,
            rating,
            numReviews,
            images,
            isFeatured,
            reviews,
            tags,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        // find product by id
        const product = await Product.findById(req.params.id);
        if (product) {
            // update product fields
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.sku = sku || product.sku;
            product.category = category || product.category;
            product.author = author || product.author;
            product.publisher = publisher || product.publisher;
            product.language = language || product.language;
            product.pages = pages || product.pages;
            product.format = format || product.format;
            product.isbn = isbn || product.isbn;
            product.publicationDate = publicationDate || product.publicationDate;
            product.rating = rating || product.rating;
            product.numReviews = numReviews || product.numReviews;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.reviews= reviews || product.reviews;
            product.metaTitle = metaTitle || product.metaTitle;
            product.metaDescription = metaDescription || product.metaDescription;
            product.metaKeywords = metaKeywords || product.metaKeywords;   
            // Save the updated product
            
            const updatedProduct = await product.save();
            res.json(updatedProduct);      
        }
        else {
            res.status(404).json({ message: "Product not found" });
            }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
})

//@route DELETE api/products/:id
//@desc Delete product by id
//@access Private
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        // find product by id
        const product = await Product.findById(req.params.id);
        if (product) {
            // delete product
            await product.deleteOne();
            res.json({ msg: 'Product deleted' });
            }
            else {
                res.status(404).json({ message: "Product not found" });
                }
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json({ msg: 'Server error' });
                    }
    } );

// @route GET api/products
// @desc Get all products with optional query filters
// @access Public
router.get('/', async (req, res) => {
    try {
        const { 
            collection,
            category,
            minPrice,
            maxPrice,
            rating,
            availability,
            brand,
            sort,
            limit,
            search,
            page
        } = req.query;

        // Build filter object
        const query = {};

        // Collection filter
        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }
        
        // Category filter
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }       

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search){
            query.$or = [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}},
                ];
        }

        // Rating filter
        if (rating) {
            query.rating = { $gte: Number(rating.split(' ')[0]) };
        }

        // Availability filter
        if (availability) {
            query.countInStock = availability === 'In Stock' ? { $gt: 0 } : { $eq: 0 };
        }

        // Brand (Publisher) filter
        if (brand) {
            query.publisher = { $in: brand.split(',') };
        }

        // Build sort object
        let sortOption = {};
        switch (sort) {
            case 'price-low-to-high':
                sortOption = { price: 1 };
                break;
            case 'price-high-to-low':
                sortOption = { price: -1 };
                break;
            case 'a-z':
                sortOption = { name: 1 };
                break;
            case 'z-a':
                sortOption = { name: -1 };
                break;
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
            default: // 'featured'
                sortOption = { isFeatured: -1, createdAt: -1 };
        }

        // Execute query with filters and sort
        const products = await Product.find(query)
            .sort(sortOption)
            .select('-reviews'); // Exclude reviews for better performance
            res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route GET api/products/:id
// @desc Get product by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
            } else {
                res.status(404).json({ msg: 'Product not found' });
                }
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ msg: 'Server error' });
                    }
                    });
// @route GET api/products/similar/:id
// @desc Get similar products by id and category 
// @access Public
router.get('/similar/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: id } // Exclude the current product
        }).limit(4); // Limit to 4 similar products

        res.json(similarProducts);        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' }); 
    }
});

module.exports = router;