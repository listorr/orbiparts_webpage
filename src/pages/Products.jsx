import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Products = () => {
  useEffect(() => {
    // This component will immediately trigger a navigation.
    // You can add logging here if needed for debugging.
    console.log("Redirecting from /products to /search");
  }, []);

  return <Navigate to="/search" replace />;
};

export default Products;