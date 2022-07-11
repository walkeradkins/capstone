import { createContext, useContext, useState } from "react";

export const WorkspaceContext = createContext();

export const useWorkspace = () => useContext(WorkspaceContext);

export default function WorkspaceProvider({ children }) {
  const [currentWorkspace, setCurrentWorkspace] = useState([]);

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, setCurrentWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
