import { useContext, useState, type FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';

export function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!auth) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.setUsuario({
      nombre: email.split('@')[0],
      email,
    });

    console.log('Iniciando sesión con:', email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}