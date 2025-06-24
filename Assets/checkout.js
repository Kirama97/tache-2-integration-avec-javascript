import {showToast_error, showToast} from './product.js';

document.addEventListener("DOMContentLoaded", function() {
    const payNowBtn = document.querySelector('.shipping_methode_btn .btn');
    const form = document.querySelector('.checkout_form_contenu_left form');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const email = localStorage.getItem('utilisateurConnecte');
    const user = users.find(user => user.email === email);

    if (!email) {
        showToast_error("Veuillez vous connecter pour continuer.");
        setTimeout(() => {
            window.location.href = "/Pages/Sign_in.html";
        }, 1500);
        return;
    }

   
    if (user && form) {
        form.querySelector('input[placeholder="prenom"]').value = user.prenom  || "";
        form.querySelector('input[placeholder="nom"]').value = user.nom || "";
    }

    
    let commandes = JSON.parse(localStorage.getItem('commandes')) || [];
    const lastCommande = [...commandes].reverse().find(cmd => cmd.utilisateur === email && cmd.infosLivraison && cmd.infosLivraison.saveInfo);

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

           
            let panier = JSON.parse(localStorage.getItem(`panier_${email}`)) || [];
            if(panier.length === 0) {
                showToast_error("Votre panier est vide, veuillez ajouter des produits.");
                setTimeout(() => {
                    window.location.href = "/Pages/Women.html";
                }, 2000);
                return;
            }

           
            const infos = {
                pays : form.elements["pays"].value.trim(),
                Entreprise : form.elements["entreprise"].value.trim(),
                quartier : form.elements["quartier"].value.trim(),
                appartement : form.elements["appartement"].value.trim(),
                ville: form.elements["ville"].value.trim(),
                codePostal: form.elements["codePostal"].value.trim(),
                telephone: form.elements["telephone"].value.trim(),
                saveInfo: form.querySelector('#saveInfo').checked || false 
            };

            
            if (!infos.pays || !infos.quartier || !infos.ville  || !infos.telephone) {
                showToast_error("Veuillez remplir tous les champs obligatoires.");
                return;
            }

            
            if (!/^\+2217[05678]\d{7}$/.test(infos.telephone)) {
                showToast_error("Veuillez entrer un numéro de téléphone valide au format +2217XXXXXXXX.");
                return;
            }

           let paiementMethode = "";
            // const selectedPayment = form.querySelector('input[name="paymentMethod"]:checked');
            // let paiementMethode = selectedPayment ? selectedPayment.value : "";
            // if (!paiementMethode) {
            //     showToast_error("Veuillez choisir une méthode de paiement.");
            //     return;
            // }

             function genererNumeroCommande() {
                // Exemple : CMD-20240624-123456
                const now = new Date();
                const datePart = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
                const randomPart = Math.floor(100000 + Math.random() * 900000); // 6 chiffres aléatoires
                return `CMD-${datePart}-${randomPart}`;
            }

            
            const commande = {
                numeroCommande : genererNumeroCommande(),
                utilisateur: email,
                infosLivraison: infos,
                paiementMethode: paiementMethode,
                produits: panier,
                nombre_de_produit : panier.length,
                date: new Date().toISOString()
            };

         
            let commandes = JSON.parse(localStorage.getItem('commandes')) || [];
            commandes.push(commande);
            localStorage.setItem('commandes', JSON.stringify(commandes));

            // Enregistrer dans le tableau utilisateur
            let commandesUser = JSON.parse(localStorage.getItem(`commandes_${email}`)) || [];
            commandesUser.push(commande);
            localStorage.setItem(`commandes_${email}`, JSON.stringify(commandesUser));

           
            localStorage.removeItem(`panier_${email}`);

           
            showToast("Commande validée avec succès !");
            setTimeout(() => {
                window.location.href = "/Pages/Confirmed_order.html";
            }, 1500);
        });
    } else {
        console.error("Le bouton de paiement ou le formulaire n'a pas été trouvé.");
    }
});




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