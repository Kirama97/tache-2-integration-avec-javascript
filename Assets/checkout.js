

 function checkout() {
    const resumerCommande = document.getElementById("resumer_commande");
    resumerCommande.innerHTML = ""; // Vider le résumé avant d'ajouter

    const email = localStorage.getItem('utilisateurConnecte');
    let panier = JSON.parse(localStorage.getItem(`panier_${email}`)) || [];


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

         const total_resume_commande = document.querySelector(".total_resume_commande");
         const subtotal_resume_commande = document.querySelector(".subTotal_resume_commande");
         const livraison = 55;

        const total = panier.reduce((acc, produit) => acc + (produit.price * produit.quantity), 0);
        subtotal_resume_commande.textContent = ` ${total.toFixed(2)}€`;
        total_resume_commande.textContent = ` ${(total + livraison).toFixed(2)}€`;
        console.log(subtotal_resume_commande)
        

        // Mettre à jour le compteur de produits dans le résumé
         const totalCount = panier.length;
            const compteur = document.querySelector('.compter_resume_panier');
            if (compteur) {
                compteur.textContent = totalCount;
            }
        resumerCommande.appendChild(li_resumerCommande);
    
    });
    
}

checkout(); // Appel initial pour afficher le résumé de la commande

