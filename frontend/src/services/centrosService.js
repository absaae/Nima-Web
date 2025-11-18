export const getCentros = async () => {
  const response = await fetch('http://localhost:5000/api/centros');
  return response.json();
};