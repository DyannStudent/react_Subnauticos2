import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Perfil.css';


//se deja en claro que se hizo uso de ia para terminar este codigo, principalmente por que perdimos mas de hora y media esperando a que git hub respondiera
export function Perfil() {
  const { usuario: usuarioUrl } = useParams<{ usuario: string }>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Soporte para ambos formatos de objeto de usuario en el contexto (cadena o bien objeto { nombre })
  const usuarioLogueadoObj = auth?.usuario;
  const nombreLogueado = typeof usuarioLogueadoObj === 'string' 
    ? usuarioLogueadoObj 
    : usuarioLogueadoObj?.nombre;
  const claveUsuario = nombreLogueado?.toLowerCase().split(/[._-]/)[0];

  // Estados de cada integrante
  const [meGustas, setMeGustas] = useState<number>(0);
  const [FuMo, setFuMo] = useState<number>(0);
  const [likesMario, setLikesMario] = useState<number>(0);
  const [lastVisit] = useState<string | null>(() => {
    if (!nombreLogueado) return null;

    const claveVisita = `perfil:ultima-visita:${nombreLogueado.toLowerCase()}`;
    const storedDate = localStorage.getItem(claveVisita);
    return storedDate ? new Date(storedDate).toLocaleString() : null;
  });

  // Validación de coincidencia de usuario
  const esUsuarioLogueado = 
    Boolean(nombreLogueado) && 
    Boolean(usuarioUrl) && 
    nombreLogueado?.toLowerCase() === usuarioUrl?.toLowerCase();

  // useEffect para guardar la última visita en localStorage
  useEffect(() => {
    if (!esUsuarioLogueado || !nombreLogueado) return;

    const claveVisita = `perfil:ultima-visita:${nombreLogueado.toLowerCase()}`;
    const currentDate = new Date();
    localStorage.setItem(claveVisita, currentDate.toISOString());
    localStorage.setItem('ultimaVisitaPerfil', new Date().toLocaleString());
  }, [esUsuarioLogueado, nombreLogueado]);

  const handleIncrementarFuMo = () => {
    setFuMo((prev) => prev + 1);
  };

  // Función para cerrar sesión y redirigir a la landing page
  const handleCerrarSesion = () => {
    if (auth?.cerrarSesion) {
      auth.cerrarSesion();
    }
    navigate('/');
  };

  // Validaciones de renderizado defensivo
  if (!usuarioLogueadoObj) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>Inicia sesión para ver este perfil.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Volver al inicio
        </button>
      </main>
    );
  }

  if (!esUsuarioLogueado) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>El usuario de la URL no coincide con el usuario que inició sesión.</p>
        <p style={{ color: 'orange' }}>Viendo el perfil público de: {usuarioUrl}</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Volver al inicio
        </button>
      </main>
    );
  }

  return (
    <main className="perfil-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Perfil de {nombreLogueado}</h1>
        {/* Botón para cerrar sesión */}
        <button 
          onClick={handleCerrarSesion} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Cerrar sesión
        </button>
      </div>

      <p style={{ color: 'green' }}>✓ Estás en tu perfil ({usuarioUrl})</p>

      {claveUsuario === 'dilan' && (
        <article className="perfil-card" aria-labelledby="proyecto-dilan-title">
          <p className="perfil-card__label">Proyecto · Laboratorio 1</p>
          <h2 id="proyecto-dilan-title">Videoteca educativa</h2>
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
      )}

      {claveUsuario === 'lucas' && (
        <article className="perfil-card" aria-labelledby="proyecto-lucas-title">
          <p className="perfil-card__label">Perfil de Lucas Campos</p>
          <h2 id="proyecto-lucas-title">Desarrollo de software</h2>
          <p>
            Colaboración en proyectos para el área y la carrera de Obstetricia.
          </p>
          <div className="perfil-card__likes">
            <p aria-live="polite">
              <strong>{FuMo}</strong> interacciones
            </p>
            <button type="button" onClick={handleIncrementarFuMo}>
              Sumar interacción
            </button>
          </div>
          {FuMo === 11 && <p>¡Llegaste a 11 interacciones!</p>}
        </article>
      )}

      {claveUsuario === 'mario' && (
        <article className="perfil-card" aria-labelledby="proyecto-mario-title">
          <p className="perfil-card__label">Proyecto · Laboratorio 1</p>
          <h2 id="proyecto-mario-title">Aplicación de Gestión de Tareas</h2>
          <div className="perfil-card__likes">
            <p aria-live="polite">
              <strong>{likesMario}</strong> me gusta
            </p>
            <button
              type="button"
              onClick={() => setLikesMario((total) => total + 1)}
            >
              Me gusta
            </button>
          </div>
          {lastVisit && <p>Última visita: {lastVisit}</p>}
        </article>
      )}
    </main>
  );
}