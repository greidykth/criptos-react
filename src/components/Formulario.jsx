import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({
  setMonedas,
  error,
  setError,
  message,
  setMessage,
  setResultado,
}) => {
  const monedas = [
    { id: "USD", name: "Dolar de Estados Unidos" },
    { id: "MXN", name: "Peso Mexicano" },
    { id: "EUR", name: "Euro" },
    { id: "GBP", name: "Libra Esterlina" },
  ];

  const [criptos, setCriptos] = useState([]);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    fetch(url)
      .then((response) => response.json())
      .then((resultado) => {
        const arrayCriptos = resultado.Data.map((cripto) => {
          return {
            id: cripto.CoinInfo.Name,
            name: cripto.CoinInfo.FullName,
          };
        });
        setCriptos(arrayCriptos);
        setError(false);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setMessage("Error al cargar lista de criptomonedas");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      setResultado({});
      setMessage("Todos los campos son obligatorios");
      return;
    }
    setError(false);
    setMessage("");

    setMonedas({
      moneda,
      criptomoneda,
    });
  };

  return (
    <>
      {error && <Error message={message} />}

      <form onSubmit={handleSubmit}>
        <SelectMonedas />

        <SelectCriptomoneda />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
