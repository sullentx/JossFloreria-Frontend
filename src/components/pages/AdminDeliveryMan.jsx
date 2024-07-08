import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DeliveryManItem from '../Organisms/deliveryManItem';
import Button from '../Button/button';
import './AdminDeliveryMan.css';

const AdminDeliveryMan = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const MySwal = withReactContent(Swal);

  const handleAddDeliveryMan = () => {
    setDeliveryMen([...deliveryMen, { id: Date.now(), fullName: '', phoneNumber: '', username: '', password: '' }]);
  };

  const handleSaveDeliveryMan = (index, updatedDeliveryMan) => {
    const newDeliveryMen = [...deliveryMen];
    newDeliveryMen[index] = updatedDeliveryMan;
    setDeliveryMen(newDeliveryMen);
  };

  const handleDeleteDeliveryMan = (index) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const newDeliveryMen = deliveryMen.filter((_, i) => i !== index);
        setDeliveryMen(newDeliveryMen);
        MySwal.fire('Borrado!', 'El repartidor ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <div className="admin-deliveryman">
      {deliveryMen.length === 0 ? (
        <p className="empty-deliveryman">No hay repartidores agregados</p>
      ) : (
        deliveryMen.map((deliveryMan, index) => (
          <DeliveryManItem
            key={deliveryMan.id}
            deliveryMan={deliveryMan}
            onSave={(updatedDeliveryMan) => handleSaveDeliveryMan(index, updatedDeliveryMan)}
            onDelete={() => handleDeleteDeliveryMan(index)}
          />
        ))
      )}
      <Button onClick={handleAddDeliveryMan} >Agregar Repartidor</Button>
    </div>
  );
};

export default AdminDeliveryMan;
