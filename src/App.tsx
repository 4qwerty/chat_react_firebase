import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/appRouter/AppRouter";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
