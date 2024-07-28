import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AdminPM.css';

const AdminPM = () => {
  const [flowers, setFlowers] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem('token');

  const fetchFlowers = async () => {
    try {
      const response = await fetch(
        'https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers/flowers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching flowers');
      }

      const data = await response.json();
      console.log('Flores obtenidas:', data);
      setFlowers(data);
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener las flores: ${error.message}`,
      });
    }
  };

  const fetchBouquets = async () => {
    try {
      const response = await fetch(
        'https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching bouquets');
      }

      const data = await response.json();
      console.log('Ramos obtenidos:', data);
      setBouquets(data);
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener los ramos: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchFlowers();
    fetchBouquets();
  }, []);

  const handleUpdate = async (id, type, updatedPrice, updatedQuantity, updatedFlowerQuantity) => {
    const url =
      type === 'flower'
        ? `https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers/flower/${id}`
        : `https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: updatedPrice,
          quantity: updatedQuantity,
          ...(type === 'bouquet' && { flower_quantity: updatedFlowerQuantity }),
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      const updatedProduct = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: `${type === 'flower' ? 'Flor' : 'Ramo'} actualizado con éxito.`,
      });

      if (type === 'flower') {
        setFlowers((prevFlowers) =>
          prevFlowers.map((flower) =>
            flower.id === id ? { ...flower, price: updatedPrice, quantity: updatedQuantity } : flower
          )
        );
      } else {
        setBouquets((prevBouquets) =>
          prevBouquets.map((bouquet) =>
            bouquet.id === id
              ? { ...bouquet, price: updatedPrice, quantity: updatedQuantity, flower_quantity: updatedFlowerQuantity }
              : bouquet
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al actualizar el producto: ${error.message}`,
      });
    }
  };

  const handleDeleteFlower = async (id) => {
    try {
      const response = await fetch(
        `https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers/flower/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting flower');
      }

      MySwal.fire({
        icon: 'success',
        title: 'Borrado',
        text: 'Flor borrada con éxito.',
      });

      setFlowers((prevFlowers) =>
        prevFlowers.filter((flower) => flower.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al borrar la flor: ${error.message}`,
      });
    }
  };

  const handleDeleteBouquet = async (id) => {
    try {
      const response = await fetch(
        `https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting bouquet');
      }

      MySwal.fire({
        icon: 'success',
        title: 'Borrado',
        text: 'Ramo borrado con éxito.',
      });

      setBouquets((prevBouquets) =>
        prevBouquets.filter((bouquet) => bouquet.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al borrar el ramo: ${error.message}`,
      });
    }
  };

  return (
    <div className="admin-pm-container">
      <h2>Gestión de Flores</h2>
      <div className="product-management-cards">
        {flowers.map((flower) => (
          <div key={flower.id} className="product-management-card">
            <img
              src={flower.image_url}
              alt={flower.name}
              className="product-image"
            />
            <h3>{flower.name}</h3>
            <p>Color: {flower.color}</p>
            <p>Precio: ${flower.price}</p>
            <p>Cantidad: {flower.quantity}</p>
            <label>
              Precio:
              <input
                type="number"
                defaultValue={flower.price}
                onBlur={(e) =>
                  handleUpdate(
                    flower.id,
                    'flower',
                    parseFloat(e.target.value),
                    flower.quantity
                  )
                }
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                defaultValue={flower.quantity}
                onBlur={(e) =>
                  handleUpdate(
                    flower.id,
                    'flower',
                    flower.price,
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </label>
            <button
              onClick={() =>
                handleUpdate(
                  flower.id,
                  'flower',
                  parseFloat(
                    document.querySelector(
                      `.product-management-card input[type="number"]`
                    ).value
                  ),
                  parseInt(
                    document.querySelector(
                      `.product-management-card input[type="number"]:nth-child(3)`
                    ).value,
                    10
                  )
                )
              }
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => handleDeleteFlower(flower.id)}
              className="delete-button"
            >
              Borrar Flor
            </button>
          </div>
        ))}
      </div>

      <h2>Gestión de Ramos</h2>
      <div className="product-management-cards">
        {bouquets.map((bouquet) => (
          <div key={bouquet.id} className="product-management-card">
            <img
              src={bouquet.image_url}
              alt={bouquet.type_name}
              className="product-image"
            />
            <h3>{bouquet.name}</h3>
            <p>Tipo: {bouquet.type_name}</p>
            <p>Detalles: {bouquet.details}</p>
            <p>Precio: ${bouquet.price}</p>
            <p>Cantidad: {bouquet.quantity}</p>
            <label>
              Cantidad de Flores:
              <input
                type="number"
                defaultValue={bouquet.flower_quantity || ''}
                onBlur={(e) =>
                  handleUpdate(
                    bouquet.id,
                    'bouquet',
                    bouquet.price,
                    bouquet.quantity,
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                defaultValue={bouquet.price}
                onBlur={(e) =>
                  handleUpdate(
                    bouquet.id,
                    'bouquet',
                    parseFloat(e.target.value),
                    bouquet.quantity,
                    bouquet.flower_quantity
                  )
                }
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                defaultValue={bouquet.quantity}
                onBlur={(e) =>
                  handleUpdate(
                    bouquet.id,
                    'bouquet',
                    bouquet.price,
                    parseInt(e.target.value, 10),
                    bouquet.flower_quantity
                  )
                }
              />
            </label>
            <button
              onClick={() =>
                handleUpdate(
                  bouquet.id,
                  'bouquet',
                  parseFloat(
                    document.querySelector(
                      `.product-management-card input[type="number"]`
                    ).value
                  ),
                  parseInt(
                    document.querySelector(
                      `.product-management-card input[type="number"]:nth-child(3)`
                    ).value,
                    10
                  ),
                  parseInt(
                    document.querySelector(
                      `.product-management-card input[type="number"]:nth-child(5)`
                    ).value,
                    10
                  )
                )
              }
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => handleDeleteBouquet(bouquet.id)}
              className="delete-button"
            >
              Borrar Ramo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPM;
