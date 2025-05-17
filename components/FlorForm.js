import { useState } from 'react';

export default function FlorForm({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar({ nombre, color });
    setNombre('');
    setColor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre de la flor"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <button type="submit">Agregar Flor</button>
    </form>
  );
}

