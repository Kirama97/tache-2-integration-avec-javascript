import {showToast_error, showToast} from './product.js';

const email_connecter = localStorage.getItem("utilisateurConnecte");
const users = JSON.parse(localStorage.getItem('users')) || [];
const user = users.find(user => user.email === email_connecter);
const contenue_compte = document.getElementById('compte_detail');
const userIndex = users.findIndex(user => user.email === email_connecter);

if (!email_connecter) {
    showToast_error('Veuillez vous connecter');
    setTimeout(() => {
        window.location.href = '/Pages/Sign_in.html';
    }, 1500);
}

// Vérifie que l'utilisateur et le container existent
if (user && contenue_compte) {
    contenue_compte.querySelector('input[name="prenom"]').value = user.prenom || "";
    contenue_compte.querySelector('input[name="nom"]').value = user.nom || "";
    contenue_compte.querySelector('input[name="email"]').value = user.email || "";
    contenue_compte.querySelector('input[name="telephone"]').value = user.telephone || "";
    contenue_compte.querySelector('input[name="password"]').value = user.password ;
} else if (contenue_compte) {
    showToast_error("Utilisateur introuvable.");
}

function emailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function verifierTelephone(telephone) {
    if (!/^\+2217[05678]\d{7}$/.test(telephone)) {
        showToast_error("Veuillez entrer un numéro de téléphone valide (9 chiffres).");
        return false;
    }
    return true;
}

const change_btn = document.querySelectorAll(".change_btn");

change_btn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const prenom = contenue_compte.querySelector('input[name="prenom"]').value.trim();
        const nom = contenue_compte.querySelector('input[name="nom"]').value.trim();
        const email = contenue_compte.querySelector('input[name="email"]').value.trim();
        const telephone = contenue_compte.querySelector('input[name="telephone"]').value.trim();
        const password = contenue_compte.querySelector('input[name="password"]').value.trim();

        if (telephone && !verifierTelephone(telephone)) {
            return;
        }

        if (!emailValide(email)) {
            showToast_error("E-mail de rechange pas valide.");
            return;
        }

        if(password && password.length < 8){
            showToast_error("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (userIndex !== -1) {
            users[userIndex] = { email, password, prenom, nom, telephone };
            localStorage.setItem('users', JSON.stringify(users));
            showToast('Données mises à jour');
        } else {
            showToast_error("Utilisateur introuvable.");
        }
    });
});