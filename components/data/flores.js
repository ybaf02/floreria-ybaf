let flores = [
    { id: 1, nombre: 'Rosa', color: 'Rojo' },
    { id: 2, nombre: 'Tulipán', color: 'Amarillo' }
  ];
  
  export function obtenerFlores() {
    return flores;
  }
  
  export function agregarFlor(flor) {
    flor.id = Date.now();
    flores.push(flor);
  }
  
  export function actualizarFlor(id, nuevosDatos) {
    const index = flores.findIndex(f => f.id === id);
    if (index !== -1) {
      flores[index] = { ...flores[index], ...nuevosDatos };
    }
  }
  
  export function eliminarFlor(id) {
    flores = flores.filter(f => f.id !== id);
  }
  
  