import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      });
      setLoading(false);
      // Armazenar o token JWT no local storage
      localStorage.setItem('token', response.data.token);

      // Redirecionar para a página de criação de tarefas
      navigate('/tasks');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }}
    return (
      <div className='TodoWrapper'>
        <div className="TodoForm">
          <h2 style={{color:"#fff"}}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{color:"#fff"}}>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="todo-input" 
                placeholder='Digite seu email'
              />
            </div>
            <div>
              <label style={{color:"#fff"}}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="todo-input"
                placeholder='Digite sua senha' 
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className='todo-btn' type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        </div>
      );
    };
    
    export default Login;
    