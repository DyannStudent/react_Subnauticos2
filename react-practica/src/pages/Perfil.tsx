import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Perfil.css';

export function Perfil() {
  const { usuario: usuarioUrl } = useParams<{ usuario: string }>();
  const auth = useContext(AuthContext);
  
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

  // Validaciones de renderizado defensivo
  if (!usuarioLogueadoObj) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>Inicia sesión para ver este perfil.</p>
      </main>
    );
  }

  if (!esUsuarioLogueado) {
    return (
      <main className="perfil-page">
        <h1>Perfil</h1>
        <p>El usuario de la URL no coincide con el usuario que inició sesión.</p>
        <p style={{ color: 'orange' }}>Viendo el perfil público de: {usuarioUrl}</p>
      </main>
    );
  }

  return (
    <main className="perfil-page">
      <h1>Perfil de {nombreLogueado}</h1>
      <p style={{ color: 'green' }}>✓ Estás en tu perfil ({usuarioUrl})</p>

      {/* Tarjeta de tu compañero */}
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

      {/* Tarjeta de Lucas Campos (Tu parte) */}
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