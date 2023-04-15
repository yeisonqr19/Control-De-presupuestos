import React, { useState, useEffect } from 'react';

export const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form action="">
        <div className="campo">
          <label htmlFor="filtrar">Filtrar por Categoría:</label>
          <select
            defaultValue="default"
            name="filtros"
            id="categoria"
            onChange={({ target }) => setFiltro(target.value)}
          >
            <option disabled value="default">
              -- Selecciona una Categoria --
            </option>

            <option value="Todos">Todos</option>
            <option value="ahorro">ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">ocio</option>
            <option value="salud">salud</option>
            <option value="suscripciones">suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};
