import React, { useState } from 'react';
import { Mensaje } from '../components';

export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  const [mensaje, setMensaje] = useState('');

  const handleChange = ({ target }) => {
    setPresupuesto(Number(target.value));
    setMensaje('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Se cumple cuando el presupuesto no es valido:
    if (!presupuesto || presupuesto < 0) {
      setMensaje('No es un presupuesto Valido');
      return;
    }

    //Se cumple cuando el presupuesto es valido:
    setMensaje('');
    setPresupuestoValido(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input
            type="number"
            name="presupuesto"
            id="presupuesto"
            className="nuevo-presupuesto"
            placeholder="Agrega tu presupuesto"
            value={presupuesto}
            onChange={handleChange}
          />

          <input type="submit" value="Agregar" />

          {mensaje.length !== 0 && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};
