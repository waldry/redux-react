import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// Redux
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { name, price, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory(); //Habilitar history para redireccion

  //   Confirmar si desea eliminarlo
  const confirmarEliminarProducto = (id) => {
    //   Preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Pasarlo al action
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //   Function que redirige de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${id}`);
  };

  return (
    <tr>
      <td> {name} </td>
      <td>
        {" "}
        <span className="font-weight-bold">$ {price}</span>{" "}
      </td>
      <td className="acciones">
        {" "}
        <button
          to={`/productos/editar/${id}`}
          className="btn btn-primary mr-2"
          type="button"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>{" "}
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
