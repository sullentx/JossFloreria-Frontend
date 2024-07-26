import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';
import { AuthContext } from '../../context/AuthContext';

const BuyNowPage = () => {
    const { token } = useContext(AuthContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log('Token:', token); 
        const fetchProductDetails = async () => {
            try {
                const response = await fetch('/api/product', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [token]);

    return (
        <div className="buy-now-page">
            {product ? (
                <ProductCard product={product} />
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default BuyNowPage;
