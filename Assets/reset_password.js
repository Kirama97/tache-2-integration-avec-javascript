import {showToast_error, showToast} from './product.js';


document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('reset_password_form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.elements["email"].value.trim();

      if (!email) {
        showToast_error("Veuillez entrer votre adresse e-mail.");
        return;
      }
   
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.email === email);
      if (userIndex === -1) {
        showToast_error("Aucun utilisateur trouvé avec cet email.");
        return;
      }

    
      showToast("Email verifier ,  Vous pouvez réinitialisé le mot de passe !");
      localStorage.setItem('reset_email', email);

      setTimeout(() => {
        window.location.href = "/Pages/New_password.html";
      }, 2500);
    });
  }
});