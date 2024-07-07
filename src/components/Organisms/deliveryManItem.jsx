import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './deliveryManItem.css';
import Input from '../Input/input';

const DeliveryManItem = ({ deliveryMan, onSave, onDelete }) => {
  const [fullName, setFullName] = useState(deliveryMan.fullName);
  const [phoneNumber, setPhoneNumber] = useState(deliveryMan.phoneNumber);
  const [username, setUsername] = useState(deliveryMan.username);
  const [password, setPassword] = useState(deliveryMan.password);
  const MySwal = withReactContent(Swal);

  const handleSave = () => {
    if (!fullName || !phoneNumber || !username || !password) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    onSave({ ...deliveryMan, fullName, phoneNumber, username, password });
  };

  return (
    <div className="deliveryman-item">
      <div className="deliveryman-details">
        <label>
          Nombre Completo:
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Número de Teléfono:
          <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Nombre de Usuario:
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="deliveryman-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onDelete}>Eliminar Repartidor</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManItem;
