# Book Store MERN Stack Application

## Project Overview
A full-stack e-commerce book store application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Redux for state management. The application features user authentication, book browsing, shopping cart functionality, order management, and an admin dashboard.

## Project Structure

### Frontend Structure (`/frontend`)
```
frontend/
├── src/
│   ├── assets/         # Static assets like images
│   ├── components/     # Reusable React components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── redux/         # Redux store and slices
│   └── App.jsx        # Main application component
```

### Backend Structure (`/backend`)
```
backend/
├── config/           # Database configuration
├── data/            # Seed data and static content
├── middleware/      # Custom middleware (auth, etc.)
├── models/          # MongoDB schemas
├── routes/          # API route handlers
└── server.js        # Express application entry point
```

## Data Flow

### Authentication Flow
1. User submits login/register credentials
2. Backend validates and creates/verifies user
3. JWT token generated and stored in Redux auth slice
4. Protected routes check token validity

### Book Purchase Flow
1. User browses books (handled by products slice)
2. Adds items to cart (managed by cart slice)
3. Proceeds to checkout (checkout slice)
4. Order creation and confirmation (order slice)

### Admin Operations Flow
1. Admin authentication with special privileges
2. Product management through adminProducts slice
3. Order management via adminOrders slice
4. User management capabilities

## Redux Store Structure
```javascript
store: {
  auth: { user, token, loading, error },
  products: { items, loading, error },
  cart: { items, total, loading },
  checkout: { details, status },
  orders: { list, current, status },
  admin: { stats, permissions },
  adminProducts: { list, operations },
  adminOrders: { orders, status }
}
```

## API Endpoints

### User Routes
- POST /api/users/register - User registration
- POST /api/users/login - User authentication
- GET /api/users/profile - Get user profile

### Product Routes
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products (Admin) - Add new product
- PUT /api/products/:id (Admin) - Update product

### Cart & Order Routes
- GET /api/cart - Get user's cart
- POST /api/cart - Add to cart
- GET /api/orders - Get user's orders
- POST /api/orders - Create new order

### Admin Routes
- GET /api/admin/orders - Get all orders
- PUT /api/admin/orders/:id - Update order status
- GET /api/admin/products - Manage products

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file with:
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is configured for deployment on Vercel:

### Backend Deployment
- Uses vercel.json configuration for Node.js deployment
- Handles API routes through serverless functions

### Frontend Deployment
- Configured with vercel.json for static site deployment
- Uses build output from Vite

## Security Features
- JWT-based authentication
- Password hashing
- Protected API routes
- Input validation
- Error handling middleware

## Database Models

### User Model
- Authentication details
- Profile information
- Order history references

### Product Model
- Book details
- Pricing information
- Stock management

### Order Model
- Order details
- Payment information
- Shipping status

### Cart Model
- Selected items
- Quantity information
- Price calculations

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
