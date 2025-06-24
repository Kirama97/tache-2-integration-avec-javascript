import {showToast_error, showToast} from './product.js';
import {commande_item} from './template.js';



const email_connecter = localStorage.getItem("utilisateurConnecte");
const commandesUser = JSON.parse(localStorage.getItem(`commandes_${email_connecter}`)) || [];
const commande_box = document.querySelector('.commandes_box');


let count_comande = commandesUser.length

console.log(email_connecter +" "+  count_comande) ; 

 if(count_comande > 0) {
        commandesUser.forEach(commande => {
        showToast(`Vous avez ${count_comande} commande(s)`)



        function dateEnFrancais(dateISO) {
        const date = new Date(dateISO);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        }

        function dateFormater(date_commande) {
            const date = new Date(date_commande);
            
            return dateEnFrancais(date);
        }

        function dateLivraisonEstimee(date_commande) {
            const date = new Date(date_commande);
            date.setDate(date.getDate() + 7);
        
            return dateEnFrancais(date);
        }

        const commande_container = document.createElement("div");
        commande_container.className = "order-card";
        commande_container.innerHTML = commande_item(
            commande,
            dateFormater,
            dateLivraisonEstimee
        );
        commande_box.appendChild(commande_container);
    });

 }else {
    commande_box.innerHTML = `<p class="text-align-center h6">Vous n'avez pas de commande en cours....</p>`
    showToast_error("Vous n'avez pas de commande ")
 }