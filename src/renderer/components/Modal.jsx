import React, { useState, useEffect } from 'react';
import { Mensaje } from '../components';

import btnCerrar from '../../../assets/imgs/cerrar.svg';

export const Modal = ({
  setModal,
  animarForm,
  setAnimarForm,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState('');

  //State para controlar los Gastos:
  const [gastos, setGastos] = useState({
    nombre: '',
    cantidad: 0,
    categoria: '',
  });

  const [id, setId] = useState('');

  const [fecha, setFecha] = useState('');

  //Esta funcion cierra el modal con el efecto del formulario:
  const cerrarModal = () => {
    setAnimarForm(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleChange = ({ target }) => {
    setGastos({
      ...gastos,
      [target.name]: target.value,
    });
    setMensaje('');
  };
  const { nombre, cantidad, categoria } = gastos;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //Validar el Formulario:
    if (
      nombre.trim() === '' ||
      cantidad <= 0 ||
      isNaN(cantidad) ||
      categoria.trim() === ''
    ) {
      setMensaje('Todos los campos son obligatorios');

      setTimeout(() => {
        setMensaje('');
      }, 3000);

      return;
    }

    //Si pasa la validacion:
    setMensaje('');
    guardarGasto(gastos, id);
    setGastos({
      nombre: '',
      cantidad: 0,
      categoria: '',
    });

    //Cierro la ventana de agregar un gasto:
    cerrarModal();
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length !== 0) {
      setGastos(gastoEditar);
      setId(gastoEditar.id);
    }
  }, []);

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={btnCerrar} alt="Cerrar Modal" onClick={cerrarModal} />
      </div>

      <form
        className={`formulario ${animarForm ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {Object.keys(gastoEditar).length !== 0
            ? 'Editar Gasto'
            : 'Nuevo Gasto'}
        </legend>

        {mensaje.length !== 0 && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">{`${
            Object.keys(gastoEditar).length !== 0
              ? 'Nuevo nombre del Gasto:'
              : 'Nombre Del Gasto:'
          }`}</label>

          <input
            type="text"
            name="nombre"
            id="nombre"
            name="nombre"
            placeholder="Agrega el Nombre del gasto"
            onChange={handleChange}
            value={nombre}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">{`${
            Object.keys(gastoEditar).length !== 0
              ? 'Nuevo Precio del Gasto:'
              : 'De Cuanto es el Gasto?:'
          }`}</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            name="cantidad"
            placeholder="Indica el monto del gasto"
            onChange={handleChange}
            value={cantidad}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">{`${
            Object.keys(gastoEditar).length !== 0
              ? 'Nueva Categoria'
              : 'Categoria'
          }`}</label>

          <select
            defaultValue="default"
            name="categoria"
            id="categoria"
            onChange={handleChange}
          >
            <option disabled value="default">
              -- Selecciona una Categoria --
            </option>
            <option value="ahorro">ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">ocio</option>
            <option value="salud">salud</option>
            <option value="suscripciones">suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={`${
            Object.keys(gastoEditar).length !== 0
              ? 'Guardar Cambios'
              : 'Guardar Gasto'
          }`}
        />
      </form>
    </div>
  );
};
