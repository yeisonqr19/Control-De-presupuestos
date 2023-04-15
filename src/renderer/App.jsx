import { useState, useEffect } from 'react';
import { Header, Modal, ListadoGastos, Filtros } from './components';
import { v4 as uuidv4 } from 'uuid';

import IconoNuevoGasto from '../../assets/imgs/nuevo-gasto.svg';

import './normalize.css';
import './App.css';

export default function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  );

  const [presupuestoValido, setPresupuestoValido] = useState(false);

  //State para comprobar si se debe mostrar la ventana Modal
  const [modal, setModal] = useState(false);

  //State para controlar cuando se animara el formulario del modal:
  const [animarForm, setAnimarForm] = useState(false);

  //State Final para almacenar todos los gastos:
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') !== null
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  );

  //State para guardar el gasto a editar:
  const [gastoEditar, setGastoEditar] = useState({});

  //State para controlar el filtro de gastos:
  const [filtro, setFiltro] = useState('');

  const [gastosFiltrados, setgastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length !== 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarForm(true);
      }, 400);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));

    if (presupuestoLS > 0) {
      setPresupuestoValido(true);
    }
  }, []);

  //para controlar el filtro de categorias de gastos:

  useEffect(() => {
    //filtrar los gastos:
    if (filtro === 'Todos') {
      setgastosFiltrados(gastos);
      return;
    }

    const gastosFiltrados = gastos.filter(
      (gasto) => gasto.categoria === filtro
    );

    setgastosFiltrados(gastosFiltrados);
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarForm(true);
    }, 400);
  };

  const guardarGasto = (gasto, id) => {
    if (gasto.id) {
      //Actualizo un Gasto:
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === id ? gasto : gastoState
      );
      gastosActualizados.id = id;
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //Creo un nuevo Gasto:
      gasto.id = uuidv4();
      gasto.fecha = Date.now();
      setGastos([gasto, ...gastos]);
    }

    setgastosFiltrados([gasto, ...gastos]);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
      />

      {presupuestoValido && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarForm={animarForm}
          setAnimarForm={setAnimarForm}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}
