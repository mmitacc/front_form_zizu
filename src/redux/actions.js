import axios from "axios";
import {
  GET_PAISES,
  POST_TRAER_ESTADOS_POR_PAIS,
  POST_TRAER_CIUDADES_POR_ESTADO,
  POST_USER,
} from "./action-types";

export const getPaises = () => {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:8080/servicio/paises");
    return dispatch({
      type: GET_PAISES,
      payload: result.data,
    });
  };
};

export const postTraerEstadosPorPais = (id) => {
  return async function (dispatch) {
    const result = await axios.post(
      "http://localhost:8080/servicio/estados",
      id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return dispatch({
      type: POST_TRAER_ESTADOS_POR_PAIS,
      payload: result.data,
    });
  };
};

export const postTraerCiudadesPorEstado = (id) => {
  return async function (dispatch) {
    const result = await axios.post(
      "http://localhost:8080/servicio/ciudades",
      id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return dispatch({
      type: POST_TRAER_CIUDADES_POR_ESTADO,
      payload: result.data,
    });
  };
};

export const postUser = (userInput) => {
  return async function (dispatch) {
    const result = await axios.post(
      "http://localhost:8080/servicio/guardar",
      userInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return dispatch({
      type: POST_USER,
      payload: result.data,
    });
  };
};
