import { createContext, useContext, useState } from "react";

export const CardStateContext = createContext();

export const useCardState = () => useContext(CardStateContext);

export default function CardStateProvider({ children }) {
  const [cardState, setCardState] = useState([]);

  return (
    <CardStateContext.Provider value={{ cardState, setCardState }}>
      {children}
    </CardStateContext.Provider>
  );
}
