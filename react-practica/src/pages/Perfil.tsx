import { useContext, useEffect, useState } from 'react';
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

  // Estados de cada integrante
  const [meGustas, setMeGustas] = useState<number>(0);
  const [FuMo, setFuMo] = useState<number>(0);

  // Validación de coincidencia de usuario
  const esUsuarioLogueado = 
    Boolean(nombreLogueado) && 
    Boolean(usuarioUrl) && 
    nombreLogueado?.toLowerCase() === usuarioUrl?.toLowerCase();

  // useEffect para guardar la última visita en localStorage
  useEffect(() => {
    if (!esUsuarioLogueado || !nombreLogueado) return;

    const claveVisita = `perfil:ultima-visita:${nombreLogueado.toLowerCase()}`;
    localStorage.setItem(claveVisita, new Date().toISOString());
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

      {/* Tarjeta de dilan */}
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

      {/* Tarjeta de Ote */}
      <section style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginTop: '1rem',
        maxWidth: '400px'
      }}>
        <h2>Tarjeta de Lucas Campos</h2>
        <p><strong>Rol / Proyecto:</strong> Desarrollador de software colaborando en el área y carrera de Obstetricia.</p>

        <button onClick={handleIncrementarFuMo} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Fumo ({FuMo})
        </button>

        {FuMo === 11 && (
          <p style={{ color: 'royalblue', fontWeight: 'bold', marginTop: '0.5rem' }}>
            ~fumo fumo~
          </p>
        )}
      </section>
    </main>
  );
}