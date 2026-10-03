import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Perfil.css';

export function Perfil() {
  const { usuario: usuarioUrl } = useParams<{ usuario: string }>();
  const auth = useContext(AuthContext);
  const usuarioLogueado = auth?.usuario;
  const [meGustas, setMeGustas] = useState<number>(0);

  if (!usuarioLogueado) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>Inicia sesión para ver este perfil.</p>
      </main>
    );
  }

  if (
    !usuarioUrl ||
    usuarioLogueado.nombre.toLocaleLowerCase() !== usuarioUrl.toLocaleLowerCase()
  ) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>El usuario de la URL no coincide con el usuario que inició sesión.</p>
      </main>
    );
  }

  return (
    <main className="perfil-page">
      <h1>Perfil de {usuarioLogueado.nombre}</h1>
      <article className="perfil-card" aria-labelledby="proyecto-title">
        <p className="perfil-card__label">Proyecto · Laboratorio 1</p>
        <h2 id="proyecto-title">Videoteca educativa</h2>
        <p>
          Plataforma de recursos audiovisuales para la Universidad Central y su
          carrera de Obstetricia.
        </p>
        <dl className="perfil-card__details">
          <div>
            <dt>Institución</dt>
            <dd>Universidad Central</dd>
          </div>
          <div>
            <dt>Carrera</dt>
            <dd>Obstetricia</dd>
          </div>
        </dl>
        <div className="perfil-card__likes">
          <p aria-live="polite">
            <strong>{meGustas}</strong> me gusta
          </p>
          <button type="button" onClick={() => setMeGustas((total) => total + 1)}>
            Me gusta
          </button>
        </div>
      </article>
    </main>
  );
}