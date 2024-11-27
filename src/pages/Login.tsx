import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
      if (email === 'jose@gmail.com' && password === '123456') {
      localStorage.setItem('auth', 'true'); 
      navigate('/dashboard'); // se quiser mudar o lugar q o bglh leva muda aki fio da puta
    } else {
      alert('Credenciais inválidas!'); 
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form className="bg-slate-100 p-32 shadow-md rounded" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;