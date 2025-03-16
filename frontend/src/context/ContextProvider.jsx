import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [canvasId, setcanvasId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Context.Provider value={{ canvasId, setcanvasId, username, setUsername }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
