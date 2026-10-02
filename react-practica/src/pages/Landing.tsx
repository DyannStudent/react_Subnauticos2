import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <main>
      <h1>Bienvenido a Subnauticos **2**</h1>
      <p>
        Explora nuestra plataforma y descubre las herramientas que tenemos!!¡¡
      </p>
      <Link to="/login">Iniciar sesión</Link>
    </main>
  );
}