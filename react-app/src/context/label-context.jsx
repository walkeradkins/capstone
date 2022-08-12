import { createContext, useContext, useState } from "react";

export const LabelContext = createContext();

export const useLabel = () => useContext(LabelContext);

export default function LabelProvider({ children }) {
  const [showLabel, setShowLabel] = useState(true);

  return (
    <LabelContext.Provider value={{ showLabel, setShowLabel }}>
      {children}
    </LabelContext.Provider>
  );
}
