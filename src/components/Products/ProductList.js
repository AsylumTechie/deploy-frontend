import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct } from '../../services/productService'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert('Failed to fetch products.');
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      imageUrl: product.imageUrl || '',
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', imageUrl: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct._id, formData);
      alert('Product updated successfully!');
      cancelEditing();
      fetchProducts();
    } catch (err) {
      alert('Failed to update product.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Products</h2>

      {editingProduct ? (
        <form onSubmit={handleUpdate} style={styles.form}>
          <h3>Edit Product</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={styles.input}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            style={styles.textarea}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            style={styles.input}
            step="0.01"
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.updateBtn}>Update</button>
          <button type="button" onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>
        </form>
      ) : products.length === 0 ? (
        <p style={styles.noData}>Loading your products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={styles.image}
              />
              <h3 style={styles.title}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>Price: ${product.price}</p>
              <p style={styles.status}>
                Status:{' '}
                <span
                  style={{
                    color:
                      product.status?.toLowerCase() === 'active'
                        ? 'green'
                        : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {product.status || 'Unavailable'}
                </span>
              </p>
              <button onClick={() => startEditing(product)} style={styles.editBtn}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' },
  heading: { textAlign: 'center', fontSize: '32px', fontWeight: '700', marginBottom: '30px', color: '#333' },
  noData: { textAlign: 'center', fontSize: '18px', color: '#777' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' },
  image: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' },
  title: { fontSize: '20px', fontWeight: '600', margin: '10px 0 5px', color: '#111827' },
  description: { fontSize: '14px', color: '#4B5563', marginBottom: '10px' },
  price: { fontSize: '16px', fontWeight: '500', color: '#1F2937' },
  status: { fontSize: '14px', marginTop: '5px' },
  editBtn: { marginTop: '10px', padding: '8px 16px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  form: { maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' },
  textarea: { padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px' },
  updateBtn: { padding: '10px', backgroundColor: 'green', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  cancelBtn: { padding: '10px', backgroundColor: 'gray', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
};

export default ProductList;
