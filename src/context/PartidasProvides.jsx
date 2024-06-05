import { React, createContext, useContext, useState } from "react";

export const PartidasContext = createContext();

export const usePartidas = () => {
  const context = useContext(PartidasContext);
  return context;
};

export default function StoreProvider({ children }) {
  const [partidas, setPartidas] = useState([]);

  const addPartida = (partida, quantity) => {

    let { id, code, description, price, notes } = partida;
    
    if (notes) {
      description = `${description} ** ${notes}`;
    } else {
      description = `${description}`;
    }
    
    const newPartida = {
      id,
      code,
      description,
      quantity,
      price: price,
      subtotal: price * quantity,
    }

    setPartidas([...partidas, newPartida]);
  };

  const deletePartida = (id) => {
    setPartidas(partidas.filter((partida) => partida.id !== id));
  };

  const updatePartida = (partida) => {

    let { id, code, description, price, notes } = partida;
    
    if (notes) {
      description = `${description} ** ${notes}`;
    } else {
      description = `${description}`;
    }

    const newPartida = {
      id,
      code,
      description,
      quantity: partida.quantity,
      price: price,
      subtotal: price * partida.quantity,
    }
    
    setPartidas(
      partidas.map((partida) => (partida.id === partida.id ? newPartida : partida))
    );
  };

  const deleteAllPartidas = () => {
    setPartidas([]);
  };

  const contextValue = {
    partidas,
    addPartida,
    deletePartida,
    updatePartida,
    deleteAllPartidas,
  };

  return (
    <PartidasContext.Provider value={contextValue}>
      {children}
    </PartidasContext.Provider>
  );
}
