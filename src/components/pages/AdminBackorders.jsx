import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBackorders.css';

const AdminBackorders = () => {
  const navigate = useNavigate();
  const [backorders, setBackorders] = useState([]);

  useEffect(() => {
    const fetchBackorders = async () => {
      try {
        const response = await fetch('/api/backorders'); // URL de la API para obtener los pedidos pendientes
        if (response.ok) {
          const data = await response.json();
          setBackorders(data);
        } else {
          console.error('Error al obtener pedidos pendientes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener pedidos pendientes:', error);
      }
    };

    fetchBackorders();
  }, []);

  const handleNotificationClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="admin-backorders-container">
      {backorders.map((order) => (
        <div 
          key={order.id} 
          className="notification-card" 
          onClick={() => handleNotificationClick(order.id)}
        >
          <div className="icon-container">
            <img src="/src/assets/icons/alert.png" alt="Urgent" className="urgent-icon" />
          </div>
          <div className="notification-details">
            <p>Nombre del Cliente: {order.clientName}</p>
            <p>Fecha del Pedido: {order.orderDate}</p>
            <p>Fecha de Entrega: {order.deliveryDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBackorders;
