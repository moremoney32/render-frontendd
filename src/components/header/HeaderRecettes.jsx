
import { NavLink } from 'react-router-dom'
import './header.css'
import { useRef } from 'react'
import horizontal from "../../icons/horizontal.svg"

export const HeaderRecettes = () => {

    const icons = useRef(null)
    const allIcons = useRef(null)

  function changeIcon(){
    if (icons.current && allIcons.current) {
        icons.current.style.display = "none";
        allIcons.current.style.display = "flex";
          allIcons.current.style.transform = 'translate3d(40px, 0px, 0px)';
      }

  }
  
  return (
    <div className='header headerAccueil'>
        <div className='h2-ri-restaurant'>
        <i class="ri-restaurant-2-line"></i>
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
        <img src={horizontal} alt='' className='horizontal-icon-recettes' ref={icons} onClick={changeIcon}/>
        {/* <div className='input-search'>
            <input type="text" className='searchInput' placeholder='search  receipts...'/>
            <i class="ri-search-line"></i>
        </div> */}
        {/* <div className='parent-ri-shopping'>
        <i class="ri-shopping-cart-line"></i>
        <span className='panierIncrement'>0</span>
        </div> */}
    </div>
  )
}