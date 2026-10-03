import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ajusta la ruta a tu contexto

export function Perfil() {
  // 1. Obtener el parámetro de la URL
  const { usuario: usuarioUrl } = useParams<{ usuario: string }>();
  
  // 2. Obtener el usuario autenticado del contexto
  const auth = useContext(AuthContext);
  
  // Verificar si el usuario de la URL coincide con el del contexto
  const esUsuarioLogueado = auth?.usuario === usuarioUrl;

  // 3. Estado propio (Contador de clics/me gusta)
  const [meGusta, setMeGusta] = useState<number>(0);

  // 4. useEffect propio: Guarda en localStorage la última visita
  useEffect(() => {
    const ahora = new Date().toLocaleString();
    localStorage.setItem('ultimaVisitaPerfil', ahora);
  }, []);

  const handleIncrementar = () => {
    setMeGusta((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Bienvenido a la página de Perfil</h1>
      
      {/* Verificación con useParams y useContext, si, gemini tambien me ayudo con esto */}
      {esUsuarioLogueado ? (
        <p style={{ color: 'green' }}>estas en tu perfilsegun yo ({usuarioUrl})</p>
      ) : (
        <p style={{ color: 'orange' }}>Viendo el perfil público de: {usuarioUrl}</p>
      )}

      {/* Tarjeta del ote */}
      <section style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginTop: '1rem',
        maxWidth: '400px'
      }}>
        <h2>Tarjerta de lucas campos</h2>
        <p><strong>Rol / Proyecto:</strong> Desarrollador de software colaborando en el área y carrera de Obstetricia.</p>

        {/* Botón con estado useState */}
        <button onClick={handleIncrementar} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Fumo ({FuMo})
        </button>

        {/* Mensaje condicional exclusivo al llegar exactamente a 11 clics */}
        {FuMo === 11 && (
          <p style={{ color: 'royalblue', fontWeight: 'bold', marginTop: '0.5rem' }}>
            ~fumo fumo~
          </p>
        )}
      </section>
    </div>
  );
}