
import { NavLink } from 'react-router-dom'
import { useRef } from 'react'
import './header.css'
import horizontal from "../../icons/horizontal.svg"

export const HeaderAccueil = () => {
    const icons = useRef(null)
    const allIcons = useRef(null)

  function changeIcon(){
    if (icons.current && allIcons.current) {
        icons.current.style.display = "none";
        allIcons.current.style.display = "flex";
      }

  }
  
  return (
    <div className='header headerAccueil'>
        <div className='h2-ri-restaurant'>
            <i className="ri-restaurant-2-line"></i>
            <h2>CUISINE DU CHEF</h2>
        </div>
        
        <nav className='nav-header'>
            <ul ref={allIcons}>
                <NavLink to="/" className={window.location.pathname === "/"? "nav-link-actu" : "nav-link-home"}><li>Acceuil</li></NavLink>
                <NavLink  to="/menu/:name" className={window.location.pathname === "/menu/:name"? "nav-link-actu" : "nav-link-home"}><li>Menu</li></NavLink>
                <NavLink to="/menu/:name/panier" className={window.location.pathname === "/menu/:name/panier"? "nav-link-actu" : "nav-link-home"}><li>Recettes</li></NavLink>
                <NavLink  className="nav-link-home"><li>A Propos</li></NavLink>
                <NavLink  className="nav-link-home"><li>Contact</li></NavLink>
            </ul>
        </nav>
        <img src={horizontal} alt='' className='horizontal-icon' ref={icons} onClick={changeIcon}/>
        {/* <div className='input-search'>
            <input type="text" className='searchInput' placeholder='search  receipts...'/>
            <i class="ri-search-line"></i>
        </div> */}
        <div className='all-parent-ri-shopping'>
        <div className='parent-ri-shopping'>
            <i className="ri-shopping-cart-line"></i>
            <span className='panierIncrement'>0</span>
        </div>
        </div>
    
    </div>
  )
}

