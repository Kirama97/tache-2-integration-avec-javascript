import {showToast_error, showToast} from './product.js';
import {commande_item} from './template.js';



const email_connecter = localStorage.getItem("utilisateurConnecte");
const commandesUser = JSON.parse(localStorage.getItem(`commandes_${email_connecter}`)) || [];
const commande_box = document.querySelector('.commandes_box');
const commande_count_box = document.querySelector('.commande_count_box');
const page_commandes = document.querySelector('#page_commandes');





export function affiche_count_commande() {
    let count_commande = commandesUser.length;
    if (commande_count_box) {
        commande_count_box.textContent = count_commande;
    }
    return count_commande;
}

affiche_count_commande();

let count_commande_v =  commandesUser.length;

console.log(email_connecter +" "+  count_commande_v) ; 

 if(count_commande_v > 0  && page_commandes ) {
        commandesUser.forEach(commande => {
        showToast(`Vous avez ${count_commande_v} commande(s)`)



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

        if(commande_box){
            commande_box.appendChild(commande_container);
        }
       
    });

 }else {

    if(commande_box) {
        commande_box.innerHTML = `<p class="text-align-center h6">Vous n'avez pas de commande en cours....</p>`
        showToast_error("Vous n'avez pas de commande ")
    }
   
    
 }