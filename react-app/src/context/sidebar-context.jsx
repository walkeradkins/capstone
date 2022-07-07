import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export default function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}
