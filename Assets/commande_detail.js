
import {showToast_error, showToast} from './product.js';


document.addEventListener('DOMContentLoaded', function() {
  
    const params = new URLSearchParams(window.location.search);
    const numeroCommande = params.get('numero');


    const email = localStorage.getItem("utilisateurConnecte");
    if (!email) {
        showToast_error('Veuillez vous connecter')
        setTimeout(() => {
            window.location.href = "/Pages/Sign_in.html";
        }, 1500);
        return;
    }

  
    const commandesUser = JSON.parse(localStorage.getItem(`commandes_${email}`)) || [];


    const commande = commandesUser.find(cmd => cmd.numeroCommande === numeroCommande);

  
    const box = document.querySelector('.whislist_contenu_right_box');

    if (!commande) {
        if (box) box.innerHTML = "<div class='alert alert-danger'>Commande introuvable.</div>";
        return;
    }

    
    function dateEnFrancais(dateISO) {
        const date = new Date(dateISO);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) + " " + date.getHours() + "h" + String(date.getMinutes()).padStart(2, '0');
    }


    const total = commande.produits.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  
    const produitsHTML = commande.produits.map(p => `
        <div class="product-box">
            <img src="${p.image}" alt="product">
            <div class="product-info">
                <strong>${p.title}</strong><br>
                <small> <span class="d-flex align-items-center">Color: <span class="color_item_resume_commande " style="background:${p.color};"></span></small>
                <small>Qty: ${p.quantity}</small>
            </div>
            <div class="text-end">
                <strong>${(p.price * p.quantity).toFixed(2)}€</strong>
            </div>
        </div>
    `).join('');


    if (box) {
        box.innerHTML = `
            <div class="d-flex justify-content-between align-items-center py-5 px-3 bg-light rounded mb-4">
                <div>
                    <strong>Order no:</strong> #${commande.numeroCommande}<br>
                    <small>Placed On: ${dateEnFrancais(commande.date)}</small>
                </div>
                <div>
                    <strong>Total:</strong> ${total.toFixed(2)}€
                </div>
            </div>
            <div class="status-line mt-5">
                <div class="status-step active"><div class="status-dot"></div>Order Placed</div>
                <div class="status-step active"><div class="status-dot"></div>Inprogress</div>
                <div class="status-step"><div class="status-dot"></div>Shipped</div>
                <div class="status-step"><div class="status-dot"></div>Delivered</div>
            </div>
            <div class="arrow-box mb-5">
                <strong>${dateEnFrancais(commande.date)}</strong>
                Votre commande a été enregistrée avec succès.
            </div>
            ${produitsHTML}
        `;
    }
});