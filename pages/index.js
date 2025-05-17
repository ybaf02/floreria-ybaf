import { useState } from 'react';
import { obtenerFlores, agregarFlor, eliminarFlor, actualizarFlor } from '../data/flores';
import FlorForm from '../components/FlorForm';
import FlorList from '../components/FlorList';

export default function Home() {
  const [flores, setFlores] = useState(obtenerFlores());

  const handleAgregar = (nuevaFlor) => {
    agregarFlor(nuevaFlor);
    setFlores([...obtenerFlores()]);
  };

  const handleEliminar = (id) => {
    eliminarFlor(id);
    setFlores([...obtenerFlores()]);
  };

  const handleActualizar = (id, nuevosDatos) => {
    actualizarFlor(id, nuevosDatos);
    setFlores([...obtenerFlores()]);
  };

  return (
    <div>
      <h1>🌼 Florería YBAF</h1>
      <FlorForm onAgregar={handleAgregar} />
      <FlorList flores={flores} onEliminar={handleEliminar} onActualizar={handleActualizar} />
    </div>
  );
}

