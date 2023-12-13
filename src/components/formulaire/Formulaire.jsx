import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import "./formulaire.css"
import {totalArticlesPrix} from "../totalArticlesPrix"
import { fetchData } from '../helpers/fetchData';


const Formulaire = ({closeForm}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit =  (data) => {
        if(data){
          console.log(data)
          let arrayRecette =  JSON.parse(localStorage.getItem("produitRecettes"))
          setLoading(true);
          totalArticlesPrix(arrayRecette).then((response)=>{
            data.amount = response[0].totalPrix
            console.log(data) 
          return  fetchData("https://tfl.onrender.com/pay",data).then((result)=>{
            
            console.log(result)
            if(result.code === "201"){
             return alert("connexion etablie"),
              window.location.href = result.data.payment_url, localStorage.removeItem('produitRecettes'), localStorage.removeItem('objectPlat'), localStorage.removeItem('quantity')
              ;
            }
            //return alert("echec connexion veuillez reessayez");
           
           
          })
          .catch((error) => {
          return console.log(error),
           alert("echec connexion veuillez reessayez");
          
         })
          .finally(() => {
          // Désactivez le chargement une fois la requête terminée (succès ou échec)
           setLoading(false);
           closeForm()
          })


            
          })
   
      // closeForm()
     
        }
      };
      
    
  
    
        
  return (
    <div className="parent-formulaire">
      {loading &&<div className="loading">
       <div className="loading-rediretion">Chargement en cours...</div>
      </div>}

        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label htmlFor="username">firstName:</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: true })}
          
          />
          
          {errors.username && <span className='error'>veuillez remplir le prenom</span>}
          <label htmlFor="username">lastName:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            {...register("lastname", { required: true })}
          
          />
          
          {errors.lastName && <span className='error'>veuillez remplir le nom</span>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === "required" && <span className='error'>mauvaise syntaxe d email</span>}

          <label htmlFor="ville">ville:</label>
          <input
            type="text"
            id="ville"
            name="ville"
            {...register("ville", { required: true })}
          />
          {errors.ville && <span className='error'>veuillez remplir la ville</span>}

          <label htmlFor="number">numero telephone:</label>
          <input
            type="text"
            id="number"
            name="phoneNumber"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && <span className='error'>veuillez remplir le numero de telephone</span>}
          <label htmlFor="livraison">cocher au cas d une livraison:</label>
          <input
            type="checkbox"
            id="livraison"
            name="livraison"
            {...register("livraison", { required: false })}
          />

          <button type="submit" className='send-command'>Envoyer</button>
        </form>
    </div>
  
  );
    
  
}

export default Formulaire

