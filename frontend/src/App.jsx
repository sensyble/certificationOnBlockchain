import { useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {
            isLoggedIn && <Route path="/dashboard" element={<Dashboard />}></Route>
          }
          <Route path="/adduser" element={<AddUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
