import React from 'react'
import "./input.css"

const Input = ({close,title,closeGetPanier}) => {

  function stockRecettes(){
   
    let input = document.querySelector(".quantity")
    let inputPanier = document.querySelector(".input-panier")
    let objectRecettes = JSON.parse(localStorage.getItem("objectPlat"))
   
    let arrayRecettes = JSON.parse(localStorage.getItem("produitRecettes"))
    let TotalQuantityPamier = JSON.parse(localStorage.getItem("quantity"))
   
    
    if(input.value> 0){
      let objectRecettesQuantity =  Object.assign({},objectRecettes , {quantity:parseInt(`${input.value}`)}); 
      console.log( objectRecettesQuantity)
      if(arrayRecettes === null){
        arrayRecettes = []
        TotalQuantityPamier = parseInt(input.value)
        arrayRecettes.push(objectRecettesQuantity)
        console.log(arrayRecettes)
        console.log(TotalQuantityPamier)
        localStorage.setItem("produitRecettes", JSON.stringify(arrayRecettes))
        localStorage.setItem("quantity", JSON.stringify(TotalQuantityPamier))
        return arrayRecettes = JSON.parse(localStorage.getItem("produitRecettes")),alert("plats envoye au panier"),closeGetPanier(), TotalQuantityPamier = JSON.parse(localStorage.getItem("quantity"))
      }
      
      else if(arrayRecettes !== null){
        
        for(let i =0 ; i<arrayRecettes.length ;i++){
          if(arrayRecettes[i].id === objectRecettesQuantity.id){
      
            console.log("true")

            arrayRecettes[i].quantity += parseInt(input.value)
            TotalQuantityPamier += parseInt(input.value)
            localStorage.setItem("produitRecettes", JSON.stringify(arrayRecettes))
            localStorage.setItem("quantity", JSON.stringify(TotalQuantityPamier))
      
            return arrayRecettes = JSON.parse(localStorage.getItem("produitRecettes")),alert("il ya deja ce produit dans le panier vous venez dajouter sa quantite"),closeGetPanier(),TotalQuantityPamier = JSON.parse(localStorage.getItem("quantity"))
          }
        }
        for(let i =0 ; i<arrayRecettes.length ;i++){
         
          if(arrayRecettes[i].id !== objectRecettesQuantity.id ){
             arrayRecettes.push(objectRecettesQuantity)
             TotalQuantityPamier += parseInt(input.value)
             console.log( arrayRecettes)
             localStorage.setItem("produitRecettes", JSON.stringify(arrayRecettes))
             localStorage.setItem("quantity", JSON.stringify(TotalQuantityPamier))

             return arrayRecettes = JSON.parse(localStorage.getItem("produitRecettes")),alert("produit envoye au panier"),closeGetPanier(),TotalQuantityPamier = JSON.parse(localStorage.getItem("quantity"))


          }
      
 }
      }

    }
    else{


      return alert("choisir une quantite positive")
   }
    
  }
 
 
  return (
  
    
    <div className='input-panier' id='input'>
      
      <i class="ri-close-circle-fill" onClick={close}></i>
        <div className='label-input'>
            <label htmlFor='itemQuantity'>Nombre de plats:</label>
            <span className='title'>{title}</span>
        
            <input type="number" name="itemQuantity" min="0" max="100" className='quantity'/>  
               
        </div>
        <button className='button' onClick={stockRecettes}>Ajouter</button> 
        
        
    </div>
    
  )
}

export default Input