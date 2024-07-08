import React from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
    const product = {
        name: '',
        imagen: '',
        Estado: 'Disponible',
        precio: '',
        Cantidad: '',
        Fechas: '',
        onBuy: () => alert('Compra realizada')
    };

    return (
        <div className="buy-now-page">
            <ProductCard product={product} />
        </div>
    );
};

export default BuyNowPage;
