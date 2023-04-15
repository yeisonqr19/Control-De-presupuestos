export const generarFecha = (fecha) => {
  const fechaFinal = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };

  return fechaFinal.toLocaleString('es-ES', opciones);
};

export const formatoMoneda = (valor) => {
  let datos = 0;
  if (typeof valor !== 'number') {
    datos = Number(valor);
  } else {
    datos = valor;
  }
  const opciones = {
    style: 'currency',
    currency: 'COP',
  };
  return datos.toLocaleString('es', opciones);
};
