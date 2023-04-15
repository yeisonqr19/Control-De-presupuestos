import React from 'react';
import { Gasto } from '../components';
import { v4 as uuidv4 } from 'uuid';

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? 'Gastos:' : 'No hay Gastos Aún'}</h2>

          {gastosFiltrados.map((gasto) => (
            <Gasto
              setGastoEditar={setGastoEditar}
              key={uuidv4()}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? 'Gastos:' : 'No hay Gastos Aún'}</h2>
          {gastos.map((gasto) => (
            <Gasto
              setGastoEditar={setGastoEditar}
              key={uuidv4()}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};
