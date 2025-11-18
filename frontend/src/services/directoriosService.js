export async function getDirectorios() {
  try {
    const res = await fetch('http://localhost:5000/api/directorios');
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los directorios:', error);
    return [];
  }
}
