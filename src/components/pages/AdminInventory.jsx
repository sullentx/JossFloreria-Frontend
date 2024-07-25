import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AdminInventory.css';
import Input from '../Input/input';
import { AuthContext } from '../../context/AuthContext';

const ProductItem = ({ product, onSave, onDelete }) => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [units, setUnits] = useState(product.units);
  const [image, setImage] = useState(product.image);
  const MySwal = withReactContent(Swal);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 300 * 300) {
      setImage(URL.createObjectURL(file));
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La imagen debe ser de 300x300 píxeles.',
      });
    }
  };

  const handleSave = async () => {
    if (!name || !price || !units || !image) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    const updatedProduct = { ...product, name, price, units, image };

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El producto ha sido actualizado con éxito.',
      });
      onSave(result);
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al guardar el producto: ${error.message}`,
      });
    }
  };

  return (
    <div className="product-item">
      <div className="product-image">
        {image ? <img src={image} alt="Product" /> : <p>Sin imagen</p>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="product-details">
        <label>
          Nombre:
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Precio:
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Unidades:
          <Input type="number" value={units} onChange={(e) => setUnits(e.target.value)} />
        </label>
        <div className="product-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onDelete}>Eliminar Producto</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
