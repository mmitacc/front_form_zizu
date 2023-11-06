import {
  GET_PAISES,
  POST_TRAER_CIUDADES_POR_ESTADO,
  POST_TRAER_ESTADOS_POR_PAIS,
  POST_USER,
} from "./action-types";

const initialState = {
  paises: [],
  estados: [],
  ciudades: [],
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAISES:
      return {
        ...state,
        paises: action.payload,
      };
    case POST_TRAER_ESTADOS_POR_PAIS:
      return {
        ...state,
        estados: action.payload,
      };
    case POST_TRAER_CIUDADES_POR_ESTADO:
      return {
        ...state,
        ciudades: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
