
export const obtenerPrecioCripto = async (cryptoCode) => {
  try {
    const url = `https://criptoya.com/api/fiwind/${cryptoCode}/ars`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`); 
    }
    const data = await response.json();
    return data.ask;
  } catch (error) {
    console.error("Fallo al obtener el precio de CryptoYa:", error);
    return null;
  }
};