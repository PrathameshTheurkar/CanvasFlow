import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinCanvas from "./pages/JoinCanvas";
import ContextProvider from "./context/ContextProvider";
import Temp from "./Temp";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<JoinCanvas />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/temp"} element={<Temp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
