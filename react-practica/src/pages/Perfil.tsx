import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function Perfil() {
  return (
    <div>
      <h1>Welcome to the Perfil Page</h1>
      <p>This is the perfil page of our React application.</p>
      
      <div className="card-dyann" style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px' }}>
        <h2>Perfil de Dyann</h2>
        <p>Proyecto del Laboratorio 1: Aplicación de Gestión de Tareas</p>
      </div>
    </div>
  );
}