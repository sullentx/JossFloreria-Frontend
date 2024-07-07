import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './productItem.css';
import Input from '../Input/input';

const ProductItem = ({ product, onSave, onDelete }) => {
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

  const handleSave = () => {
    if (!name || !price || !units || !image) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    onSave({ ...product, name, price, units, image });
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
