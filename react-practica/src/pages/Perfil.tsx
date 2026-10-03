import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export function Perfil() {
  const { usuario } = useParams();
  const auth = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  const esMiPerfil = auth?.usuario?.nombre === usuario;

  useEffect(() => {
    if (esMiPerfil) {
      const storedDate = localStorage.getItem(`lastVisit_${usuario}`);
      if (storedDate) {
        setLastVisit(storedDate);
      }
      
      const currentDate = new Date().toLocaleString();
      localStorage.setItem(`lastVisit_${usuario}`, currentDate);
    }
  }, [esMiPerfil, usuario]);

  return (
    <div>
      <h1>Welcome to the Perfil Page</h1>
      <p>This is the perfil page of our React application.</p>
      
      {esMiPerfil ? (
        <div className="card-mario" style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px' }}>
          <h2>Perfil de {usuario}</h2>
          <p>Proyecto del Laboratorio 1: Aplicación de Gestión de Tareas</p>
          <button onClick={() => setLikes(likes + 1)} style={{ marginBottom: '10px' }}>
            Me gusta ({likes})
          </button>
          {lastVisit && <p style={{ fontSize: '0.8em', color: '#666' }}>Última visita: {lastVisit}</p>}
        </div>
      ) : (
        <p style={{ color: 'red', padding: '20px' }}>No estás viendo tu propio perfil o no has iniciado sesión con este usuario.</p>
      )}
    </div>
  );
}