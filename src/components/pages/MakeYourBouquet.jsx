import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './MakeYourBouquet.css';

const MakeYourBouquet = () => {
  const [selection, setSelection] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [flowerOptions, setFlowerOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para acceder a esta funcionalidad.',
        showConfirmButton: true,
      }).then(() => {
        // Redirigir al usuario a la página de inicio de sesión, por ejemplo:
        window.location.href = '/login';
      });
      return; // Detiene el resto de la ejecución
    }

    const fetchFlowers = async () => {
      try {
        const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const availableFlowers = data.filter((flower) => flower.quantity > 0);
          setFlowerOptions(availableFlowers);
        } else {
          console.error('Failed to fetch flowers');
        }
      } catch (error) {
        console.error('Error fetching flowers:', error);
      }
    };

    fetchFlowers();
  }, []);

  const handleSelection = (num) => {
    setSelection(num);
    setSelectedFlowers([]);
  };

  const handleFlowerClick = (flower) => {
    if (selectedFlowers.includes(flower)) {
      setSelectedFlowers(selectedFlowers.filter((f) => f !== flower));
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

  const handleAddToCart = async () => {
    if (validateSelection()) {
      const bouquetDetails = selectedFlowers
        .map((flower) => {
          const quantity = selection === 1 ? 30 : selection === 2 ? 15 : 10;
          return `${quantity} x ${flower.name}`;
        })
        .join(', ');

      const bouquet = {
        name: 'Ramo personalizado',
        type_name: 'Custom Bouquet',
        details: bouquetDetails,
        price: selectedFlowers.reduce((total, flower) => {
          const quantity = selection === 1 ? 30 : selection === 2 ? 15 : 10;
          return total + flower.price * quantity;
        }, 0),
        quantity: 30, 
        is_precreated: false,
        image_url: '',
      };

      try {
        const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(bouquet),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Ramo añadido al carrito',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Añadido al carrito:', bouquet);
          setSelection(null);
          setSelectedFlowers([]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir el ramo',
            text: 'Hubo un problema al intentar añadir el ramo. Intenta de nuevo.',
          });
          console.error('Failed to add bouquet:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding bouquet:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'No se pudo conectar con el servidor.',
        });
      }
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
        <div
          className={`selection-card ${selection === 1 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(1)}
        >
          <img src="/path/to/image1.jpg" alt="1 Flor" />
          <h3>1 Flor</h3>
        </div>
        <div
          className={`selection-card ${selection === 2 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(2)}
        >
          <img src="/path/to/image2.jpg" alt="2 Flores" />
          <h3>2 Flores</h3>
        </div>
        <div
          className={`selection-card ${selection === 3 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(3)}
        >
          <img src="/path/to/image3.jpg" alt="3 Flores" />
          <h3>3 Flores</h3>
        </div>
      </div>

      {flowerOptions.length === 0 && (
        <div className="no-flowers-message">
          <p>Todavía no hay flores... Espera nuevas próximamente</p>
        </div>
      )}

      {selection && flowerOptions.length > 0 && (
        <div className="flower-options">
          {flowerOptions.map((flower) => (
            <div
              key={flower.id}
              className={`flower-option ${selectedFlowers.includes(flower) ? 'selected' : 'not-selected'}`}
              onClick={() => handleFlowerClick(flower)}
            >
              <img src={flower.image_url} alt={flower.name} className="flower-image" />
              <div className="flower-details">
                <h4>{flower.name}</h4>
                <p>Color: {flower.color}</p>
                <p>Precio: {flower.price}</p>
                <p>Disponibles: {flower.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selection && (
        <div className="add-to-cart-button">
          <Button type="button" onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </div>
      )}
    </div>
  );
};

export default MakeYourBouquet;
