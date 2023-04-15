import React, { useState, useEffect } from 'react';
import { formatoMoneda } from './helpers';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  const [porcentaje, setPorcentaje] = useState(20);

  //estados para controlar el disponible y el gastado:
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  //Para controlar el presupuesto y el gasto:
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    //Calcular El porcentaje gastado:
    const porcentajeGastado = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);
    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 1000);
  }, [gastos]);

  const handleResetApp = () => {
    const confirmacion = window.confirm('¿Estas seguro de resetear la app?');

    if (confirmacion) {
      setGastos([]);
      setPresupuesto(0);
      setPresupuestoValido(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>

        <p>
          <span>Presupuesto: </span> {formatoMoneda(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatoMoneda(disponible)}
        </p>

        <p>
          <span>Gastado: </span> {formatoMoneda(gastado)}
        </p>
      </div>
    </div>
  );
};
