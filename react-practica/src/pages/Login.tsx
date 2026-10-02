import { useState, type FormEvent } from 'react';

export function Login() {
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
  )
}