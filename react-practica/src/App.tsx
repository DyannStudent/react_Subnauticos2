import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Perfil } from './pages/Perfil';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta 1: Muestra Landing en "midominio.com/" */}
        <Route path="/" element={<Landing />} />

        {/* Ruta 2: Muestra Login en "midominio.com/login" */}
        <Route path="/login" element={<Login />} />

        {/* Ruta 3: Muestra Perfil en "midominio.com/perfil/cualquierNombre" */}
        <Route path="/perfil/:usuario" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}
