import "./FormUser.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaises,
  postTraerCiudadesPorEstado,
  postTraerEstadosPorPais,
  postUser,
} from "../../redux/actions";
import PlaceOption from "../placeOption/PlaceOption";
import swal from "sweetalert";

const FormUser = () => {
  //Captura de etiquetas "Select"
  const selectPaises = document.querySelector(".paises");
  const selectEstados = document.querySelector(".estados");
  const selectCiudaddes = document.querySelector(".ciudades");
  //Se trae el array de PAISES del BackEnd
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);
  const { paises } = useSelector((state) => state);
  console.log(paises);

  //Una vez seleccionado un PAIS, se trae el array de ESTADOS
  const handleOnChangePaises = (e) => {
    //Captando  Select en localidades
    selectCiudaddes.value = "Seleciones un valor";
    selectEstados.value = "Seleciones un valor";
    //Cargando data
    const id = e.target.value;
    if (id !== "Seleciones un valor") {
      selectEstados.disabled = false;
      dispatch(postTraerEstadosPorPais(id));
    } else {
      selectCiudaddes.disabled = true;
      selectEstados.disabled = true;
    }
    console.log(id);
  };
  const { estados } = useSelector((state) => state);
  console.log(estados);

  //Una vez seleccionado el ESTADO, se trae el array de CIUDADES
  const handleOnChangeEstados = (e) => {
    //limpiando Select en localidades
    selectCiudaddes.value = "Seleciones un valor";
    //Cargando data
    const id = e.target.value;
    if (id !== "Seleciones un valor") {
      selectCiudaddes.disabled = false;
      dispatch(postTraerCiudadesPorEstado(id));
    } else {
      selectCiudaddes.disabled = true;
    }
    console.log(id);
  };
  const { ciudades } = useSelector((state) => state);
  console.log(estados);

  //POSTEANDO el formulario USER----------------------------------------
  //- Inicializando estados locales:
  const initialState = {
    ciudadId: "",
    nombre: "",
    edad: "",
  };

  //- Estado local del POST para User:
  const [input, setInput] = useState(initialState);

  //- Estado local para validación de datos erróneos
  const [error, setError] = useState(initialState);

  //- Reglas de validación de datos para el Form
  const validationRules = {
    // Nombre con un mínimo de 5 y máximo 50 caracteres:
    nombre: /^(?=.{5,50}$)/,
    // Números enteros: 18 a 99:
    edad: /\b1[8-9]\b|\b[2-9]\d\b|\b[2-9]\d{2-9,}\b/,
  };

  //VAlidando los campos del FormUSER
  const validateFieldFormUser = (input) => {
    if (input.nombre) {
      if (validationRules.nombre.test(input.nombre)) {
        setError({ ...error, nombre: "" });
      } else {
        setError({
          ...error,
          nombre: "El nombre debe tener mínimo 5 letras y máximo 50.",
        });
      }
    }
    if (input.edad) {
      if (validationRules.edad.test(input.edad)) {
        setError({ ...error, edad: "" });
      } else {
        setError({
          ...error,
          edad: "Debe ser mayor de edad, número entero entre 18 y 99 años.",
        });
      }
    }
    if (input.ciudadId) {
      let fieldFull = [selectPaises, selectEstados, selectCiudaddes].includes(
        (local) => local.value === "Seleciones un valor"
      );
      if (fieldFull) {
        setError({
          ...error,
          ciudadId: "Debe seleccionar: País, Estado y Ciudad.",
        });
      } else {
        setError({ ...error, ciudadId: "" });
      }
    }
  };

  //- Manejador de cambios en los inputs del Form
  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
    validateFieldFormUser({
      ...input,
      [e.target.name]: [e.target.value],
    });
  };
  console.log(input);

  //- Enviando formulario al servidor
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const pendingErrors = Object.values(error).join("");
    if (pendingErrors === "" && input.nombre && input.edad && input.ciudadId) {
      dispatch(postUser(input));
      swal({
        title: "Bien hecho!",
        text: `${input.nombre}`,
        icon: "success",
        button: "Ok!",
      });
    } else {
      if (error.nombre === "" && error.edad === "") {
        swal("Registro fallido!", "Falto completar: El nombre y/o la edad.");
      } else {
        swal(
          "Registro fallido.",
          `Falto completar: ${Object.values(error).join(" ")}`
        );
      }
    }
    onClickReset();
  };

  //- Reiniciando el Formulario
  const onClickReset = () => {
    selectPaises.value = "Seleciones un valor";
    selectCiudaddes.value = "Seleciones un valor";
    selectEstados.value = "Seleciones un valor";
    selectCiudaddes.disabled = true;
    selectEstados.disabled = true;
    setInput(initialState);
    setError(initialState);
  };

  //--------------------------------------------------------------------

  return (
    <div className="containerMain">
      <div>
        <h3>Registro de Usuario</h3>
      </div>
      <div>
        <form className="containerForm" onSubmit={handleOnSubmit}>
          <div className="containerInput">
            <label className="labelBlue">{"> Nombre:"}</label>
            <input
              type="text"
              name="nombre"
              value={input.nombre}
              onChange={handleOnChange}
              placeholder="Este campo es obligatorio ...!"
            />
            {error.nombre !== "" && (
              <p className="labelAlert">{error.nombre}</p>
            )}
          </div>
          <div className="containerInput">
            <label className="labelBlue">{"> Edad:"}</label>
            <input
              type="text"
              name="edad"
              value={input.edad}
              onChange={handleOnChange}
              placeholder="Este campo es obligatorio ...!"
              maxLength={2}
            />
            {error.edad !== "" && <p className="labelAlert">{error.edad}</p>}
          </div>
          <div className="containerInput">
            <label className="labelBlue">{"> País:"}</label>
            <select
              className="paises"
              name="paises"
              onChange={handleOnChangePaises}
            >
              <option value="Seleciones un valor" selected>
                Seleciones un valor
              </option>
              {paises?.map((p) => {
                return <PlaceOption key={p.id} id={p.id} name={p.nombre} />;
              })}
            </select>
          </div>
          <div className="containerInput">
            <label className="labelBlue">{"> Estado:"}</label>
            <select
              className="estados"
              name="estados"
              onChange={handleOnChangeEstados}
              disabled={true}
            >
              <option value="Seleciones un valor" selected>
                Seleciones un valor
              </option>
              {estados?.map((p) => {
                return <PlaceOption key={p.id} id={p.id} name={p.nombre} />;
              })}
            </select>
          </div>
          <div className="containerInput">
            <label className="labelBlue">{"> Ciudad:"}</label>
            <select
              className="ciudades"
              name="ciudadId"
              value={input.ciudadId}
              onChange={handleOnChange}
              disabled={true}
            >
              <option value="Seleciones un valor" selected>
                Seleciones un valor
              </option>
              {ciudades?.map((p) => {
                return <PlaceOption key={p.id} id={p.id} name={p.nombre} />;
              })}
            </select>
          </div>
          <div className="containerButton">
            {input.ciudadId !== "" && (
              <button className="blueButton" type="submit">
                Submit
              </button>
            )}
            <button className="blueButton" type="reset" onClick={onClickReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUser;
