import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/button.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity] = useState(1); 
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date) {
      console.log("Fecha seleccionada:", date);
      setSelectedDate(date);
    } else {
      console.log("La fecha seleccionada es nula o inválida.");
    }
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

    if (!(selectedDate instanceof Date) || isNaN(selectedDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Fecha',
        text: 'La fecha seleccionada no es válida.',
      });
      return;
    }

    try {
      
      const formattedDate = selectedDate.toISOString();

      const requestData = {
        status_id: 2,
        request_date: formattedDate, 
      };

      console.log('Enviando solicitud para actualizar el estado del producto:', {
        url: `https://ks60rj7q-3000.usw3.devtunnels.ms/api/requests/${product.id}/status`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      const response = await fetch(
        `https://ks60rj7q-3000.usw3.devtunnels.ms/api/requests/${product.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log('Respuesta del servidor:', await response.json());
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada con éxito',
          text: `Fecha seleccionada: ${selectedDate.toLocaleDateString()}`,
        }).then(() => {
          // Redirigir a la página de confirmación
          navigate('/apartar-ahora');
        });
      } else {
        console.error(
          'Error en la respuesta del servidor:',
          response.status,
          await response.text()
        );
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al apartar el producto.',
        });
      }
    } catch (error) {
      console.error('Error al apartar producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al apartar el producto.',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://ks60rj7q-3000.usw3.devtunnels.ms/api/requests/${product.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        console.log('Respuesta del servidor:', await response.json());
        Swal.fire({
          icon: 'success',
          title: 'Solicitud eliminada',
          text: 'La solicitud ha sido eliminada exitosamente.',
        }).then(() => {
          // Actualizar el estado local o redirigir a otra página
          navigate('/productos'); // Cambia esta ruta según sea necesario
        });
      } else {
        console.error(
          'Error en la respuesta del servidor:',
          response.status,
          await response.text()
        );
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar la solicitud.',
        });
      }
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar la solicitud.',
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
        <p className="product-name">
          <span className="label">Ramo:</span> {product.name}
        </p>
        <p className="product-price">
          <span className="label">Precio:</span> {product.price}
        </p>
        <div className="product-date-picker">
          <label>
            <span className="label">Fechas disponibles:</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha"
              className="custom-datepicker"
              minDate={new Date(new Date().setDate(new Date().getDate() + 3))}
            />
          </label>
        </div>
        <div className="product-quantity">
          <label>
            <span className="label">Cantidad:</span>
            <p>{quantity}</p> {/* Cantidad como solo informativo */}
          </label>
        </div>
        <Button text="Comprar" onClick={handleBuy}>
          Comprar
        </Button>
        <Button text="Eliminar" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
