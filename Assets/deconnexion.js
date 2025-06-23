
import {showToast_error, showToast} from './product.js';


// ---------------------deconnexion-----------------------

const deconnexion = document.getElementById("deconnexion");

deconnexion.addEventListener('click', () => {
   
    // console.log("Déconnexion réussie !");
  
    const email = localStorage.getItem('utilisateurConnecte');
    if (!email) {
       
        showToast_error("Vous n'êtes pas connecté , je vous redirige vers la page de connexion");
        setTimeout(() => {
           window.location.href = "/Pages/Sign_in.html";
        }, 2200);
        return;
    }
      showToast("Déconnexion réussie !", "success");
    localStorage.removeItem('utilisateurConnecte');
    setTimeout(() => {
      window.location.href = "/Pages/Sign_in.html";   
    }, 2200);
});

   