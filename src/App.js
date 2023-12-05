import React from 'react'
//import Header from './components/header/Header'
import PanierRecettes from "./components/panier/PanierRecettes.jsx"
import { Geolocation } from './components/geolocalisation/Geolocation';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import Menu from './pages/Menu';



const App = () => {
  return (
    <BrowserRouter>
    <div className='app'> 
    {/* <Header/> */}
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu/:name" element={<Menu/>} />
        <Route path="/menu/:name/panier" element={<PanierRecettes/>} />
     </Routes>
     <Geolocation/>
    </div>
    </BrowserRouter>
  )
}

export default App