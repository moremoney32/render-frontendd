import React from 'react'
//import Header from './components/header/Header'
import PanierRecettes from "./components/panier/PanierRecettes.jsx"
import { Geolocation } from './components/geolocalisation/Geolocation';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Footer from './components/footer/Footer.jsx';
import Section from './components/section/Section.jsx';



const App = () => {
  return (
    <BrowserRouter>
    <div className='app'> 
    {/* <Header/> */}
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu/:name" element={<Menu/>} />
        <Route path="/menu/:name/panier" element={<PanierRecettes/>} />
        <Route path="/propos" element={<Section/>} />
        <Route path="/contact" element={<Footer/>} />
     </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App