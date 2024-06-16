import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>

          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="chat" 
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
