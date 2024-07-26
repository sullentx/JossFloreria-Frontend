import React, { useState, useEffect } from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
    const [product, setProduct] = useState({
        name: '',
        imagen: '',
        Estado: 'Disponible',
        precio: '',
        Cantidad: '',
        Fechas: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/api/product'); // URL de la API para obtener la información del producto
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error('Error al obtener el producto:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, []);

    const handleBuy = () => {
        alert('Compra realizada');
    };

    return (
        <div className="buy-now-page">
            <ProductCard product={{ ...product, onBuy: handleBuy }} />
        </div>
    );
};

export default BuyNowPage;
