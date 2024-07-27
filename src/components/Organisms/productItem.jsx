import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './productItem.css';
import Input from '../Input/input';

const ProductItem = ({ isFlower, onSave, onDelete }) => {
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [typeName, setTypeName] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image_url, setImageUrl] = useState(null);
  const [isPrecreated, setIsPrecreated] = useState(false);
  const [flowerQuantity, setFlowerQuantity] = useState('');

  useEffect(() => {
    if (!isFlower) {
      setIsPrecreated(true);
    }
  }, [isFlower]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !quantity || (isFlower && !color) || (!isFlower && (!typeName || !flowerQuantity))) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    try {
      const url = isFlower
        ? 'https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers/flower'
        : 'https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets';

      const formData = new FormData();
      formData.append('name', name);
      if (isFlower) {
        formData.append('color', color);
      } else {
        formData.append('type_name', typeName);
        formData.append('details', details);
        formData.append('is_precreated', 1);
        formData.append('flower_quantity', flowerQuantity);
      }
      formData.append('price', price);
      formData.append('quantity', quantity);
      if (image_url && image_url instanceof File) {
        formData.append('image_url', image_url);
      } else if (image_url) {
        formData.append('existing_image_url', image_url);
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona una imagen para el producto.',
        });
        return;
      }
      formData.append('created_at', new Date().toISOString());
      formData.append('created_by', 'user_id_placeholder');
      formData.append('updated_at', new Date().toISOString());
      formData.append('updated_by', 'user_id_placeholder');
      formData.append('deleted', false);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }

      const result = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El producto ha sido guardado con éxito.',
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
        {image_url ? (
          image_url instanceof File ? (
            <img src={URL.createObjectURL(image_url)} alt="Product" />
          ) : (
            <img src={image_url} alt="Product" />
          )
        ) : (
          <p>Sin imagen</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="product-details">
        <label>
          Nombre:
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            pattern="[A-Za-z\s]*" 
            title="Solo letras y espacios" 
          />
        </label>
        {isFlower ? (
          <>
            <label>
              Color:
              <Input 
                type="text" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                pattern="[A-Za-z\s]*" 
                title="Solo letras y espacios" 
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Tipo:
              <Input 
                type="text" 
                value={typeName} 
                onChange={(e) => setTypeName(e.target.value)} 
                pattern="[A-Za-z\s]*" 
                title="Solo letras y espacios" 
              />
            </label>
            <label>
              Detalles:
              <Input 
                type="text" 
                value={details} 
                onChange={(e) => setDetails(e.target.value)} 
                pattern="[A-Za-z\s]*" 
                title="Solo letras y espacios" 
              />
            </label>
            <label>
              Cantidad de Flores:
              <Input 
                type="number" 
                value={flowerQuantity} 
                onChange={(e) => setFlowerQuantity(e.target.value)} 
                min="0" 
                step="1" 
                title="Solo números positivos" 
              />
            </label>
          </>
        )}
        <label>
          Precio:
          <Input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            min="0" 
            step="0.01" 
            title="Solo números positivos" 
          />
        </label>
        <label>
          Cantidad:
          <Input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            min="0" 
            step="1" 
            title="Solo números positivos" 
          />
        </label>
        {!isFlower && (
          <label>
            Precreado:
            <input type="checkbox" checked={isPrecreated} disabled />
          </label>
        )}
        <div className="product-actions">
          <button onClick={handleSave}>
            Guardar
          </button>
          <button onClick={onDelete}>Eliminar Producto</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
