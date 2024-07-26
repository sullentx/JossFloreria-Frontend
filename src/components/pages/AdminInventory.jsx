import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProductItem from '../Organisms/productItem';
import Button from '../Button/button';
import './AdminInventory.css';

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const MySwal = withReactContent(Swal);

  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), name: '', price: '', units: '', image: null }]);
  };

  const handleSaveProduct = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  const handleDeleteProduct = (index) => {
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
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        MySwal.fire('Borrado!', 'El producto ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <div className="admin-inventory">
      {products.length === 0 ? (
        <p className="empty-inventory">Inventario vacío</p>
      ) : (
        products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            onSave={(updatedProduct) => handleSaveProduct(index, updatedProduct)}
            onDelete={() => handleDeleteProduct(index)}
          />
        ))
      )}
     <Button type="button" onClick={handleAddProduct}>Agregar Producto</Button>
    </div>
  );
};

export default AdminInventory;