import React from 'react'
import { useForm } from 'react-hook-form';
import "./formulaire.css"
import {totalArticlesPrix} from "../totalArticlesPrix"
import { fetchData } from '../helpers/fetchData';


const Formulaire = ({closeForm}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit =  (data) => {
        if(data){
          console.log(data)
          let arrayRecette =  JSON.parse(localStorage.getItem("produitRecettes"))
          totalArticlesPrix(arrayRecette).then((response)=>{
            data.amount = response[0].totalPrix
            console.log(data) 
          return  fetchData("http://localhost:3001/pay",data).then((result)=>{
            
            console.log(result)
            if(result.code === "201"){
              window.location.href = result.data.payment_url
              ;
            }
           
           
          })
          .catch((error) => {
           console.log(error);
          
         })

            
          })
   
      closeForm()
     
        }
      };
      
    
  
    
        
  return (
    <div className="parent-formulaire">
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

          <button type="submit" className='send-command'>Envoyer</button>
        </form>
    </div>
  
  );
    
  
}

export default Formulaire

