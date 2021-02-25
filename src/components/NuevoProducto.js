import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Action de redux
import { crearNuevoProducto } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  // state del componente
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  // utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // Manda a llamar el action de productoAction
  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));

  // Cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    // Validar formulario
    if (name.trim() === "" || price <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }
    // si no hay errores
    dispatch(ocultarAlertaAction());

    // Crear el nuevo producto
    agregarProducto({
      name,
      price,
    });
    // Redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta && <p className={alerta.classes}> {alerta.msg} </p>}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label htmlFor="">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando && <p>Cargando...</p>}
            {error && (
              <p className="alert alert-danger p2 mt-2 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
