import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './DeliveryOrder.css';

const DeliveryOrder = () => {
  const [status, setStatus] = useState(null);

  const handleStatusChange = () => {
    if (status === 'Entregado') {
      Swal.fire({
        icon: 'info',
        title: 'El pedido ya está entregado y no puede cambiar de estado.',
      });
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de que deseas cambiar el estado a "Entregado"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setStatus('Entregado');
        Swal.fire({
          icon: 'success',
          title: `El estado ha cambiado a "Entregado".`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="delivery-order-container">
      <h1 className="delivery-order-title">Rosas</h1>
      <div className="order-content">
        <img src="/path/to/your/image.jpg" alt="Producto" className="product-image" />
        <div className="order-details">
          <p>Nombre del Cliente</p>
          <p>Precio del pedido</p>
          <p>Fecha elegida</p>
          <p>Dirección del Cliente</p>
          <p>Teléfono del Cliente</p>
          <p>Estatus</p>
          <div className="status-buttons">
            <button 
              className={`status-button entregado ${status === 'Entregado' ? 'active' : ''}`}
              onClick={handleStatusChange} 
              disabled={status === 'Entregado'}
            >
              Entregado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrder;
