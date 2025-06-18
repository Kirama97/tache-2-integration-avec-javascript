import {showToast_error, showToast} from './product.js';


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('new_password_form');
  const email = localStorage.getItem('reset_email');

  if (!email) {
    
    showToast_error("Aucun email à réinitialiser. Veuillez recommencer la procédure.");
    
    setTimeout(() => {
        window.location.href = "/Pages/Reset_password.html";
    }, 1500);
    return;
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const password1 = form.elements["password1"].value.trim();
      const password2 = form.elements["password2"].value.trim();

      if (!password1 || !password2) {
      
        showToast_error("Veuillez remplir les deux champs de mot de passe.");
        return;
      }
      if (password1.length < 8) {
      
        showToast_error("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
      if (password1 !== password2) {
        
        showToast_error("Les mots de passe ne correspondent pas.");
        return;
      }

      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.email === email);

      if (userIndex === -1) {
        
        showToast_error("Utilisateur introuvable.");
        return;
      }

      users[userIndex].password = password1;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('reset_email');
 ;

      showToast("Mot de passe réinitialisé avec succès !");
        setTimeout(() => {
            window.location.href = "/Pages/Sign_in.html";
        }, 2000);
      
    });
  }
});