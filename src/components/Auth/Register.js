import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

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
      boxShadow: '0 8px 24px rgba(0, 31, 77, 0.15)', 
      maxWidth: '400px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '30px',
      color: '#001F4D', 
      fontSize: '28px',
      fontWeight: '700',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      marginBottom: '20px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#0057FF',
      boxShadow: '0 0 8px rgba(0, 87, 255, 0.5)',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#0057FF', 
      color: 'white',
      fontSize: '18px',
      fontWeight: '600',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#003FCC', 
    },
    errorMessage: {
      color: '#FF7C00', 
      marginBottom: '15px',
    },
  };
  

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState('');

  const navigate= useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setFocusedInput(e.target.name);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful. Please log in.');
      navigate('/'); 
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          style={{
            ...styles.input,
            ...(focusedInput === 'username' ? styles.inputFocus : {}),
          }}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          style={{
            ...styles.input,
            ...(focusedInput === 'email' ? styles.inputFocus : {}),
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          style={{
            ...styles.input,
            ...(focusedInput === 'password' ? styles.inputFocus : {}),
          }}
        />

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
