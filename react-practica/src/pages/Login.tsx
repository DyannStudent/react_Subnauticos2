import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Login() {
  const auth = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const navigate = useNavigate();

  if (!auth) {
    return null;
  }

  const { iniciarSesion } = auth;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    iniciarSesion(nombreUsuario, contrasena);
    navigate(`/perfil/${encodeURIComponent(nombreUsuario)}`);
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreUsuario">Nombre de usuario</label>
        <input
          id="nombreUsuario"
          name="nombreUsuario"
          type="text"
          autoComplete="username"
          value={nombreUsuario}
          onChange={(event) => setNombreUsuario(event.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          autoComplete="current-password"
          value={contrasena}
          onChange={(event) => setContrasena(event.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}