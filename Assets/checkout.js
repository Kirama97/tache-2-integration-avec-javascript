
import {showToast_error, showToast} from './product.js';



document.addEventListener("DOMContentLoaded", function() {

   const payNowBtn = document.querySelector('.shipping_methode_btn .btn');
   const form = document.querySelector('.checkout_form_contenu_left form');
   let users = JSON.parse(localStorage.getItem('users')) || [];
   const email = localStorage.getItem('utilisateurConnecte');
   const user = users.find(user => user.email === email) ; 




    if (!email) {
                 
                 showToast_error("Veuillez vous connecter pour continuer.");
                 alert("Veuillez vous connecter pour continuer.");
                 window.location.href = "/Pages/Sign_in.html";
                 return;
         }

      
    if (user && form) {
       form.querySelector('input[placeholder="prenom"]').value = user.prenom  || "";
       form.querySelector('input[placeholder="nom"]').value = user.nom || "";
   }

    let commandes = JSON.parse(localStorage.getItem('commandes')) || [];
    const lastCommande = commandes.reverse().find(cmd => cmd.utilisateur === email && cmd.infosLivraison && cmd.infosLivraison.saveInfo);

    if (lastCommande && form) {
        const infos = lastCommande.infosLivraison;
        if (infos) {
            form.elements["pays"].value = infos.pays || "";
            form.elements["entreprise"].value = infos.Entreprise || "";
            form.elements["quartier"].value = infos.quartier || "";
            form.elements["appartement"].value = infos.appartement || "";
            form.elements["ville"].value = infos.ville || "";
            form.elements["codePostal"].value = infos.codePostal || "";
            form.elements["telephone"].value = infos.telephone || "";
            form.querySelector('#saveInfo').checked = true;
        }
    }


    if(payNowBtn && form) {
       payNowBtn.addEventListener('click', function(e) {
          e.preventDefault();
       
            // recuperer le panier de l'utilisateur
            let panier = JSON.parse(localStorage.getItem(`panier_${email}`)) || [];

             if(panier.length === 0) {
                showToast_error("Votre panier est vide ,veuillez ajouter des produits.");
                // alert("Votre panier est vide , veuillez ajouter des produits.");
               setTimeout(() => {
                   window.location.href = "/Pages/Women.html";
               }, 2000);
                return;
             }


            // recuperer les informations du formaulaire

            const infos = {
               pays : form.elements["pays"].value.trim(),
               Entreprise : form.elements["entreprise"].value.trim(),
               quartier : form.elements["quartier"].value.trim(),
               appartement : form.elements["appartement"].value.trim(),
               ville: form.elements["ville"].value.trim(),
               codePostal: form.elements["codePostal"].value.trim(),
               telephone: form.elements["telephone"].value.trim(),
               saveInfo: form.querySelector('#saveInfo').checked || false 
            }

            // valide les entres
            if (!infos.pays || !infos.quartier || !infos.ville  || !infos.telephone) {
                showToast_error("Veuillez remplir tous les champs obligatoires.");
                // alert("Veuillez remplir tous les champs obligatoires.");
                return;
            }

               if (!/^7[05678]\d{7}$/.test(infos.telephone)) {
                    alert("Veuillez entrer un numéro de téléphone valide (9 chiffres).");
                    return;
                }


            // la methode de paiement choisie

           let paiementMethode = ""
            //  const selectedPayment = form.querySelector('input[name="paymentMethod"]:checked');
                               
            //     let paiementMethode = selectedPayment ? selectedPayment.value : "";

            //     if (!paiementMethode) {
            //         alert("Veuillez choisir une méthode de paiement.");
            //         return;
            //     }
                            // Créer la commande

            const commande = {

                utilisateur: email,
                infosLivraison: infos,
                paiementMethode: paiementMethode,
                produits: panier,
                date: new Date().toISOString()
            }

            // Enregistrer la commande dans le localStorage
            let commandes = JSON.parse(localStorage.getItem('commandes')) || [];
            commandes.push(commande);
            localStorage.setItem('commandes', JSON.stringify(commandes));

            // Vider le panier de l'utilisateur
            localStorage.removeItem(`panier_${email}`);

            // Message de confirmation
            // alert("Commande validée avec succès !");
            showToast("Commande validée avec succès !");
            window.location.href = "/Pages/Confirmed_order.html"; // Crée une page de succès si besoin
            


       })
    }else{
         console.error("Le bouton de paiement ou le formulaire n'a pas été trouvé.");
    }



})













function checkout() {
    const resumerCommande = document.getElementById("resumer_commande");
    resumerCommande.innerHTML = "";

    const email = localStorage.getItem('utilisateurConnecte');
    let panier = JSON.parse(localStorage.getItem(`panier_${email}`)) || [];

    // Calcul du total et sous-total
    const total = panier.reduce((acc, produit) => acc + (produit.price * produit.quantity), 0);
    const livraison = 55;
    const total_resume_commande = document.querySelector(".total_resume_commande");
    const subtotal_resume_commande = document.querySelector(".subTotal_resume_commande");
    if (subtotal_resume_commande) subtotal_resume_commande.textContent = ` ${total.toFixed(2)}€`;
    if (total_resume_commande) total_resume_commande.textContent = ` ${(total + livraison).toFixed(2)}€`;

    // Mettre à jour le compteur de produits dans le résumé
    const totalCount = panier.length;
    const compteur = document.querySelector('.compter_resume_panier');
    if (compteur) {
        compteur.textContent = totalCount;
    }

    panier.forEach(produit => {
        const li_resumerCommande  = document.createElement("li");
        li_resumerCommande.classList.add("d-flex", "justify-content-between", "align-items-start");
        li_resumerCommande.innerHTML = `
            <img src="${produit.image}" onclick="window.location.href='/products.html?id=${produit.id}'" alt="Item" class="me-2" style="width: 50px;">
            <div class="flex-grow-1">
                <strong>${produit.title} x ${produit.quantity}</strong><br>
                <span class="d-flex align-items-center">Color: <span class="color_item_resume_commande " style="background:${produit.color};"></span></span>
            </div>
            <p>${(produit.price * produit.quantity).toFixed(2)}€</p>
        `;
        resumerCommande.appendChild(li_resumerCommande);
    });
}

checkout();