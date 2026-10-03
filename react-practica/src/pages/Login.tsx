import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // parte ote importada

export function Login() {
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');

  const navigate = useNavigate(); // Instancia del hook para navegar (gemini me tuvo q explicar esto por q les juro q no lo pude conectar bien)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate(`/perfil/${nombreUsuario}`); // aqui se redirije al perfil desde el user
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