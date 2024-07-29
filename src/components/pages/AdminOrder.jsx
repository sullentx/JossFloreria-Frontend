
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch('https://ks60rj7q-3000.usw3.devtunnels.m/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === 'Terminado') {
  const location = useLocation();
  const { order } = location.state || {}; 
  const [status, setStatus] = useState(order ? order.status : null);

  const handleStatusChange = async (newStatus) => {
    
    const statusIds = {
      'Elaborado': 3,
      'En Camino': 4,
      'Entregado': 5,
    };

    const statusId = statusIds[newStatus];

    if (status === 'Entregado') {
      Swal.fire({
        icon: 'info',
        title: 'El pedido ya está terminado y no puede cambiar de estado.',
      });
      return;
    }

    console.log(`Intentando cambiar el estado a: ${newStatus} (ID: ${statusId})`);

    const confirmResult = await Swal.fire({
      title: `¿Estás seguro de que deseas cambiar el estado a "${newStatus}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ks60rj7q-3000.usw3.devtunnels.m/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
          .then(response => response.json())
          .then((updatedOrder) => {
            setOrders(orders.map((order) => (order.id === orderId ? updatedOrder : order)));
            Swal.fire({
              icon: 'success',
              title: `El estado ha cambiado a "${newStatus}".`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`https://ks60rj7q-3000.usw3.devtunnels.ms/api/requests/${order.id}/status/admin`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
          body: JSON.stringify({ status_id: statusId }), 
        });

        console.log(`Respuesta de la solicitud PATCH: ${response.status} ${response.statusText}`);

        if (response.ok) {
          setStatus(newStatus);
          Swal.fire({
            icon: 'success',
            title: `El estado ha cambiado a "${newStatus}".`,
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(`Estado actualizado a: ${newStatus}`);
        } else {
          const errorText = await response.text();
          console.error('Error al actualizar el estado del pedido:', errorText);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el estado del pedido.',
            text: errorText,
          });
        }
      } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el estado del pedido.',
        });
      }
    }
  };

  const statuses = ['Elaborado', 'En Camino', 'Entregado'];

  return (
    <div className="admin-order-container">
      <h1 className="admin-order-title">Status de pedidos</h1>
      <div className="admin-order-content">
        {orders.map((order) => (
          <div key={order.id} className="admin-order-details">
            <p>Nombre del Cliente: {order.customerName}</p>
            <p>Precio del pedido: {order.price}</p>
            <p>Fecha elegida: {order.date}</p>
            <p>Dirección del Cliente: {order.address}</p>
            <p>Teléfono del Cliente: {order.phone}</p>
            <p>Estatus: {order.status}</p>
            <div className="admin-status-buttons">
              {statuses.map((item) => (
                <button
                  key={item}
                  className={`admin-status-button ${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusChange(order.id, item)}
                  disabled={order.status === 'Terminado' || order.status === item}
      <h1 className="admin-order-title">Detalles del Pedido</h1>
      {order ? (
        <div className="admin-order-content">
          <img src="/path/to/your/image.jpg" alt="Producto" className="product-image" />
          <div className="admin-order-details">
            <p>Nombre del Cliente: {order.customer_name}</p>
            <p>Precio del pedido: ${order.price}</p>
            <p>Fecha elegida: {order.request_date}</p>
            <p>Dirección del Cliente: {order.customer_address}</p>
            <p>Teléfono del Cliente: {order.customer_phone}</p>
            <p>Estatus: {status}</p>
            <div className="admin-status-buttons">
              {statuses.map((item) => (
                <button 
                  key={item}
                  className={`admin-status-button ${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusChange(item)} 
                  disabled={status === 'Entregado' || status === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
        </div>
      ) : (
        <p>Cargando detalles del pedido...</p>
      )}
    </div>
  );
};

export default AdminOrder;