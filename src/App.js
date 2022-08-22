import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Admin from "./components/admin.components.jsx";
import NewListingForm from "./components/NLF.components.jsx";
import Home from './components/Login.component.jsx';
import User from './components/User.component.jsx';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<NewListingForm />}/>
      </Routes>
    </BrowserRouter>
  );    
}

export default App;
