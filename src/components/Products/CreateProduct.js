import React, { useState } from 'react';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert('Product created successfully.');
      setFormData({ name: '', description: '', price: '', imageUrl: '' }); 
      navigate("/products")
    } catch (err) {
      alert('Product creation failed.');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Create Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: '100px', resize: 'vertical' }}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    padding: '0 20px',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#6366f1',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#4f46e5',
  },
};

export default CreateProduct;
