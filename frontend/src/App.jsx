import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinCanvas from "./pages/JoinCanvas";
import ContextProvider from "./context/ContextProvider";
import Temp from "./Temp";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<JoinCanvas />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/temp"} element={<Temp />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
