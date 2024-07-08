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
                <Button text="Comprar" onClick={() => product.onBuy(quantity)}>Comprar</Button>
            </div>
        </div>
    );
};

export default ProductCard;
