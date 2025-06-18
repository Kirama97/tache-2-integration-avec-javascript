import { showToast_error, showToast } from './product.js';

function emailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.hero_sign_form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.elements["email"].value.trim();
            const password = form.elements["password"].value.trim();

            if (!email || !password) {
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

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Vérifier si l'utilisateur existe
            const user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                showToast_error("Identifiants incorrects. Veuillez réessayer.");
                return;
            }
            localStorage.setItem('utilisateurConnecte', email);

            showToast("Connexion réussie !" + (user.nomComplet ? " " + user.nomComplet : ""));
            
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);
        });
    }
});