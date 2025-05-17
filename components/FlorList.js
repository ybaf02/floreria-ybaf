export default function FlorList({ flores, onEliminar, onActualizar }) {
    return (
      <ul>
        {flores.map((flor) => (
          <li key={flor.id}>
            🌸 {flor.nombre} - {flor.color}
            <button onClick={() => onEliminar(flor.id)}>Eliminar</button>
            <button onClick={() => {
              const nuevoNombre = prompt('Nuevo nombre:', flor.nombre);
              const nuevoColor = prompt('Nuevo color:', flor.color);
              onActualizar(flor.id, { nombre: nuevoNombre, color: nuevoColor });
            }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  