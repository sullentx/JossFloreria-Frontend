import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './MakeYourBouquet.css';

const flowerOptions = [
  { id: 1, name: 'Flor 1', price: 10, image: '/path/to/flower1.jpg' },
  { id: 2, name: 'Flor 2', price: 15, image: '/path/to/flower2.jpg' },
  { id: 3, name: 'Flor 3', price: 20, image: '/path/to/flower3.jpg' },
  // Agrega más flores según sea necesario
];

const MakeYourBouquet = () => {
  const [selection, setSelection] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  const handleSelection = (num) => {
    setSelection(num);
    setSelectedFlowers([]);
  };

  const handleFlowerClick = (flower) => {
    if (selectedFlowers.includes(flower)) {
      setSelectedFlowers(selectedFlowers.filter(f => f !== flower));
    } else if (selection === 1 && selectedFlowers.length < 1) {
      setSelectedFlowers([flower]);
    } else if (selection === 2 && selectedFlowers.length < 2) {
      setSelectedFlowers([...selectedFlowers, flower]);
    } else if (selection === 3 && selectedFlowers.length < 3) {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const validateSelection = () => {
    if (selection === 1 && selectedFlowers.length === 1) return true;
    if (selection === 2 && selectedFlowers.length === 2) return true;
    if (selection === 3 && selectedFlowers.length === 3) return true;
    return false;
  };

  const handleAddToCart = () => {
    if (validateSelection()) {
      const bouquetDetails = selectedFlowers.map((flower) => {
        const quantity = selection === 1 ? 30 : selection === 2 ? 15 : 10;
        return `${quantity} x ${flower.name}`;
      }).join(', ');

      const bouquet = {
        name: 'Ramo personalizado',
        description: bouquetDetails,
        price: selectedFlowers.reduce((total, flower) => {
          const quantity = selection === 1 ? 30 : selection === 2 ? 15 : 10;
          return total + flower.price * quantity;
        }, 0)
      };

      // Aquí deberías agregar el ramo al carrito en la base de datos
      console.log('Añadido al carrito:', bouquet);
      Swal.fire({
        icon: 'success',
        title: 'Ramo añadido al carrito',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'La selección no es válida',
        text: 'Por favor selecciona las cantidades correctas de flores.',
      });
    }
  };

  return (
    <div className="make-your-bouquet">
      <div className="selection-cards">
        <div className={`selection-card ${selection === 1 ? 'selected' : 'not-selected'}`} onClick={() => handleSelection(1)}>
          <img src="/path/to/image1.jpg" alt="1 Flor" />
          <h3>1 Flor</h3>
        </div>
        <div className={`selection-card ${selection === 2 ? 'selected' : 'not-selected'}`} onClick={() => handleSelection(2)}>
          <img src="/path/to/image2.jpg" alt="2 Flores" />
          <h3>2 Flores</h3>
        </div>
        <div className={`selection-card ${selection === 3 ? 'selected' : 'not-selected'}`} onClick={() => handleSelection(3)}>
          <img src="/path/to/image3.jpg" alt="3 Flores" />
          <h3>3 Flores</h3>
        </div>
      </div>
      
      {selection && (
        <div className="flower-options">
          {flowerOptions.map((flower) => (
            <div 
              key={flower.id} 
              className={`flower-option ${selectedFlowers.includes(flower) ? 'selected' : 'not-selected'}`}
              onClick={() => handleFlowerClick(flower)}
            >
              <img src={flower.image} alt={flower.name} className="flower-image" />
              <div className="flower-details">
                <h4>{flower.name}</h4>
                <p>Precio: {flower.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selection && (
        <div className="add-to-cart-button">
          <Button 
            type="button" 
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </Button>
        </div>
      )}
    </div>
  );
};

export default MakeYourBouquet;
