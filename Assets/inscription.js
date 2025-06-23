import {showToast_error, showToast} from './product.js';

 function emailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.hero_sign_form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const prenom = form.elements["prenom"].value.trim();
      const nom = form.elements["nom"].value.trim();
      const email = form.elements["email"].value.trim();
      const password = form.elements["password"].value.trim();

      if (!email || !password || !prenom || !nom) {
        
        showToast_error("Veuillez remplir tous les champs.");
        return;
      }
      if (!emailValide(email)) {
       
        showToast_error("Veuillez entrer une adresse e-mail valide.");
        return;
      }
      if (password.length < 8) {
       
        showToast_error("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }

      // Récupérer le tableau d'utilisateurs existant ou créer un nouveau tableau
      let users = JSON.parse(localStorage.getItem('users')) || [];

      // Vérifier si l'email existe déjà
      if (users.some(user => user.email === email)) {
        showToast_error("Cet email est déjà utilisé.");
        return;
      }

      // Ajouter le nouvel utilisateur
      users.push({ email, password , prenom , nom });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('utilisateurConnecte', email);
    
      showToast("Inscription réussie !" + " " + prenom + " " + nom );
     
      setTimeout(() => {
         window.location.href = "/Pages/Sign_in.html";
      }, 2000);
    });
  }
});