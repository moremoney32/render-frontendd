import React, { useEffect, useState,useRef } from 'react'
import { NavLink } from 'react-router-dom'
// import './header.css'
import "./header-menu.css"
import horizontal from "../../icons/horizontal.svg"


const Header = () => {
  
  const [panier,setPanier] = useState(0)
  let TotalQuantityPanier = JSON.parse(localStorage.getItem("quantity"))
  TotalQuantityPanier =JSON.parse(localStorage.getItem("quantity"))
  const icons = useRef(null)
  const allIcons = useRef(null)
  const parentNavbar = useRef(null)
  
  function changeIcons(){
    if (icons.current && allIcons.current) {
        icons.current.style.display = "none";
        allIcons.current.style.display = "flex";
        parentNavbar.current.style.display = "flex"
        parentNavbar.current.style.gap = "20px"
        parentNavbar.current.style.transform = 'translate3d(-30px, -10px, 0px)';
      }
  }
  function handleClick(){
    window.scrollTo(0,document.querySelector("#propos").offsetBottom)
  }

  console.log(TotalQuantityPanier)
  useEffect(()=>{
    if(TotalQuantityPanier){
      console.log(panier)
      setPanier(TotalQuantityPanier)
    }   
    console.log(panier)
    
  },[TotalQuantityPanier])
  return (
    <div className='header' ref={parentNavbar}>
        <div className='h2-ri-restaurant header-restaurant'>
          <i class="ri-restaurant-2-line"></i>
          <h2>CUISINE DU CHEF</h2>
        </div>
        <nav className='nav-header'>
            <ul ref={allIcons}>
              <NavLink to="/" className={window.location.pathname === "/"? "nav-link-actu" : "nav-link-home"}><li>Acceuil</li></NavLink>
              <NavLink  to="/menu/:name" className={window.location.pathname === "/menu/:name"  || "/menu/:riz" || "/menu/:poulet" || "/menu/:pattes" || "/menu/:pizza" ? "nav-link-actu" : "nav-link-home"}><li>Menu</li></NavLink>
              <NavLink to="/menu/:name/panier" className={window.location.pathname === "/menu/:name/panier"? "nav-link-actu" : "nav-link-home"}><li>Recettes</li></NavLink>
              <NavLink className="nav-link-home" to="/propos"><li>A Propos</li></NavLink>
              <NavLink   className="nav-link-home" to="/contact"><li>Contact</li></NavLink>
            </ul>
        </nav>
        <img src={horizontal} alt=''ref={icons} className='horizontal-icon-menu' onClick={changeIcons}/>
        <div className='input-search'>
            <input type="text" className='searchInput' placeholder='search  receipts...'/>
            <i className="ri-search-line"></i>
        </div>
        <div className='all-parent-ri-shopping'>
          <div className='parent-ri-shopping'>
          <i class="ri-shopping-cart-line"></i>
          <NavLink to="/menu/:name/panier" className="white"><span className='panierIncrement'>{panier}</span></NavLink>
          </div>
        </div>
    </div>
  )
}

export default Header