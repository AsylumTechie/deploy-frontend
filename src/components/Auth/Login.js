import React, { useState } from 'react';
import { login } from '../../services/authService';
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
  inputFocus: {
    borderColor: '#6366f1', 
    boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
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
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
  },
};

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
      const token = await login(formData);
      localStorage.setItem('token', token);
      onLogin();
      navigate('/'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}

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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
