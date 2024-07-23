import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './AdminOrder.css';

const AdminOrder = () => {
  const [status, setStatus] = useState(null);

  const handleStatusChange = (newStatus) => {
    if (status === 'Terminado') {
      Swal.fire({
        icon: 'info',
        title: 'El pedido ya está terminado y no puede cambiar de estado.',
      });
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de que deseas cambiar el estado a "${newStatus}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setStatus(newStatus);
        Swal.fire({
          icon: 'success',
          title: `El estado ha cambiado a "${newStatus}".`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const statuses = ['En proceso', 'Listo', 'En Camino', 'Terminado'];

  return (
    <div className="admin-order-container">
      <h1 className="admin-order-title">Rosas</h1>
      <div className="admin-order-content">
        <img src="/path/to/your/image.jpg" alt="Producto" className="product-image" />
        <div className="admin-order-details">
          <p>Nombre del Cliente</p>
          <p>Precio del pedido</p>
          <p>Fecha elegida</p>
          <p>Dirección del Cliente</p>
          <p>Teléfono del Cliente</p>
          <p>Estatus</p>
          <div className="admin-status-buttons">
            {statuses.map((item) => (
              <button 
                key={item}
                className={`admin-status-button ${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleStatusChange(item)} 
                disabled={status === 'Terminado' || status === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
