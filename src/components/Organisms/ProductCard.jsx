import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from "../Button/button.jsx";
import Swal from 'sweetalert2'; 
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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, selecciona una fecha y una cantidad válida.',
            });
            return;
        }

        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            const response = await fetch(`https://ks60rj7q-3000.usw3.devtunnels.ms/requests/${product.id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status_id: 2,
                    request_date: selectedDate.toISOString() 
                })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada con éxito',
                text: `Fecha seleccionada: ${selectedDate.toLocaleDateString()}`,
            });

        } catch (error) {
            console.error('Error realizando la compra:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error realizando la compra',
            });
        }
    };

    return (
        <div className="product-card">
            <div className="product-left">
                <h1 className="product-title">{product.name}</h1>
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-right">
                <p className="product-name"><span className="label">Ramo:</span> {product.name}</p>
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
                                minDate={new Date(new Date().setDate(new Date().getDate() + 3))} 
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
                            onChange={handleQuantityChange}
                            min="1"
                            className="quantity-input"
                        />
                    </label>
                </div>
                <Button text="Comprar" onClick={handleBuy}>Comprar</Button>
            </div>
        </div>
    );
};

export default ProductCard;
