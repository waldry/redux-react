import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Nuevo state de producto
  const [producto, setProducto] = useState({
    name: "",
    price: "",
  });

  // Producto a editar
  const productoeditar = useSelector((state) => state.productos.productoeditar);

  useEffect(() => {
    setProducto(productoeditar);
  }, [productoeditar]);

  // Leer los datos del formulario
  const onChangeFormulario = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  const { name, price } = producto;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="price"
                  value={price}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
