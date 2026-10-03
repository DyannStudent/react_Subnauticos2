import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Perfil() {
  const { usuario: usuarioUrl } = useParams<{ usuario: string }>();
  const auth = useContext(AuthContext);
  const usuarioLogueado = auth?.usuario;

  if (!usuarioLogueado) {
    return (
      <main>
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
      <main>
        <h1>Perfil</h1>
        <p>El usuario de la URL no coincide con el usuario que inició sesión.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Perfil de {usuarioLogueado.nombre}</h1>
    </main>
  );
}