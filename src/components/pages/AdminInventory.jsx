import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProductItem from '../Organisms/productItem';
import Button from '../Button/button';
import './AdminInventory.css';

const AdminInventory = () => {
  const MySwal = withReactContent(Swal);
  const [products, setProducts] = useState([]);
  const [isFlower, setIsFlower] = useState(true); 


  const token = localStorage.getItem('token');

  useEffect(() => {
    // Cargar productos desde localStorage cuando el componente se monte
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Si no hay productos almacenados, obtener desde la API
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    // Guardar productos en localStorage cuando cambie el estado
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    try {
      const flowerResponse = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/flowers/flower', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const bouquetResponse = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!flowerResponse.ok || !bouquetResponse.ok) {
        throw new Error('Error al obtener productos');
      }

      const flowerData = await flowerResponse.json();
      const bouquetData = await bouquetResponse.json();

      const allProducts = [...flowerData, ...bouquetData];
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener los productos: ${error.message}`,
      });
    }
  };

 
  const toggleProductType = () => {
    setIsFlower(!isFlower);
  };

  const handleAddProduct = () => {
    const newProduct = isFlower
      ? { id: Date.now(), name: '', price: '', color: '', quantity: '', image_url: null }
      : { id: Date.now(), name: '', type_name: '', details: '', price: '', quantity: '', is_precreated: false, image_url: null };

    setProducts([...products, newProduct]);
  };

  const handleSaveProduct = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  const handleDeleteProduct = (index) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancelar',
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
      <div className="inventory-header">
        <Button type="button" onClick={toggleProductType}>
          {isFlower ? 'Agregar Ramo' : 'Agregar Flor'}
        </Button>
        <Button type="button" onClick={handleAddProduct}>
          {isFlower ? 'Agregar Flor' : 'Agregar Ramo'}
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="empty-inventory">Inventario vacío</p>
      ) : (
        products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            isFlower={isFlower} // Pasar el estado de tipo de producto
            onSave={(updatedProduct) => handleSaveProduct(index, updatedProduct)}
            onDelete={() => handleDeleteProduct(index)}
          />
        ))
      )}
    </div>
  );
};

export default AdminInventory;
