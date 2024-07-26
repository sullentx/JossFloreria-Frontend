import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../../context/AuthContext';
import './productItem.css';
import Input from '../Input/input';

const ProductItem = ({ product = {}, onSave, onDelete }) => {
  const { token } = useAuth(); 
  const MySwal = withReactContent(Swal);
  const [name, setName] = useState(product.name || '');
  const [color, setColor] = useState(product.color || '');
  const [price, setPrice] = useState(product.price || '');
  const [quantity, setQuantity] = useState(product.quantity || '');
  const [image_url, setImage_url] = useState(product.image || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage_url(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name || !color || !price || !quantity || !image_url) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/flowers/flower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ name, color, price, quantity, image_url})
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }

      const result = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El producto ha sido agregado con éxito.',
      });
      onSave(result);
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al agregar el producto: ${error.message}`,
      });
    }
  };
  
  return (
    <div className="product-item">
      <div className="product-image">
        {image_url ? <img src={image_url} alt="Product" /> : <p>Sin imagen</p>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="product-details">
        <label>
          Nombre:
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Color:
          <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          Precio:
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Cantidad:
          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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
