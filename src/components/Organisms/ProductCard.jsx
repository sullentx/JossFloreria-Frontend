import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from "../Button/button.jsx";
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleBuy = async () => {
        if (!selectedDate || quantity <= 0) {
            alert('Por favor, selecciona una fecha y una cantidad válida.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Obtener el token de localStorage
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            const response = await fetch('https://api.tu-dominio.com/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en la solicitud
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: parseInt(quantity, 10), // Asegurarse de que quantity sea un número
                    date: selectedDate.toISOString() // Convertir la fecha a ISO 8601
                })
            });
            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
            const data = await response.json();
            alert('Compra realizada con éxito');
        } catch (error) {
            console.error('Error realizando la compra:', error);
            alert('Error realizando la compra');
        }
    };

    return (
        <div className="product-card">
            <div className="product-left">
                <h1 className="product-title">{product.name}</h1>
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-right">
                <p className="product-status"><span className="label">Status:</span> {product.status}</p>
                <p className="product-price"><span className="label">Price:</span> {product.price}</p>
                <div className="product-date-picker">
                    <label>
                        <span className="label">Fechas disponibles:</span>
                        <div className="product-date-picker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccionar fecha"
                                className="custom-datepicker"
                            />
                        </div>
                    </label>
                </div>
                <div className="product-quantity">
                    <label>
                        <span className="label">Cantidad:</span>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                        />
                    </label>
                </div>
                <Button text="Comprar" onClick={handleBuy}>Comprar</Button>
            </div>
        </div>
    );
};

export default ProductCard;
