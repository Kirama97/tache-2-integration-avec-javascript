

export function checkout() {
    const resumerCommande = document.getElementById("resumer_commande");
    resumerCommande.innerHTML = ""; // Vider le résumé avant d'ajouter

    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    panier.forEach(produit => {
        const li_resumerCommande  = document.createElement("li");
        li_resumerCommande.classList.add("d-flex", "justify-content-between", "align-items-start");
        li_resumerCommande.innerHTML = `
            <img src="${produit.image}" onclick="window.location.href='/pages/products.html?id=${produit.id}'" alt="Item" class="me-2" style="width: 50px;">
            <div class="flex-grow-1">
                <strong>${produit.title} x ${produit.quantity}</strong><br>
                <span class="d-flex align-items-center">Color: <span class="color_item_resume_commande " style="background:${produit.color};"></span></span>
            </div>
            <p>${produit.price}</p>
        `;
        
       
        resumerCommande.appendChild(li_resumerCommande);
    });
    
}

checkout(); // Appel initial pour afficher le résumé de la commande