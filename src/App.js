import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Chat from "./pages/chat/chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
