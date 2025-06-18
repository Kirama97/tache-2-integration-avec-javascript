

const email = localStorage.getItem('utilisateurConnecte');
let panier = JSON.parse(localStorage.getItem(`panier_${email}`)) || [];
const panierContainer = document.getElementById("cart_table_body");
import { updateCartCount } from "./product.js";

console.log(panier)

export function AfficherLePanier() {
    panierContainer.innerHTML = "";

    if (panier && panier.length > 0) {
        panier.forEach((produit, index) => {
            const produitElement = document.createElement("tr");
            produitElement.innerHTML = `
                <td class="d-flex align-items-center produit_au_panier" onclick="window.location.href='/products.html?id=${produit.id}'">
                    <img src="${produit.image}" class="product-img me-3">
                    <div class="text-start">
                        <strong >${produit.title}</strong>
                        <small class="d-flex align-items-center">Color:<span class="color_item_panier "></span>  </small>
                        <small>Size: ${produit.size}</small>
                    </div>
                </td>
                <td><strong>${produit.price}</strong></td>
                <td>
                    <div class="quantity-control justify-content-center">
                        <button class="btn btn-sm moins-produit" data-index="${index}">-</button>
                        <span class="quantité">${produit.quantity}</span>
                        <button class="btn btn-sm plus-produit" data-index="${index}">+</button>
                    </div>
                </td>
                <td>FREE</td>
                <td><strong class="somme_partielle">${(produit.price * produit.quantity).toFixed(2)}€</strong></td>
                <td><i class="bi bi-trash trash-icon" data-index="${index}"></i></td>
            `;

            
            const colorItem = produitElement.querySelector(".color_item_panier");
            colorItem.style.backgroundColor = produit.color; 
            panierContainer.appendChild(produitElement);


            // Ajouter le produit au résumé de la commande

           
           

        });
    } else {
        panierContainer.innerHTML = `<tr "><td colspan="6" class="text-center m-5">Votre panier est vide.</td></tr>`;
    }
}

AfficherLePanier(panier);



// Gestion des quantités
panierContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("plus-produit")) {
        const index = e.target.getAttribute("data-index");
        panier[index].quantity += 1;
        localStorage.setItem(`panier_${email}`, JSON.stringify(panier));
        AfficherLePanier(panier);
        totalPrice()
        updateCartCount(panier.length); // Mettre à jour le compteur du panier
    }
    if (e.target.classList.contains("moins-produit")) {
        const index = e.target.getAttribute("data-index");
        if (panier[index].quantity > 1) {
            panier[index].quantity -= 1;
            localStorage.setItem(`panier_${email}`, JSON.stringify(panier));
            AfficherLePanier(panier);
            totalPrice()
            updateCartCount(panier.length); // Mettre à jour le compteur du panier
        }
    }
    // Suppression d'un produit
    if (e.target.classList.contains("trash-icon")) {
        const index = e.target.getAttribute("data-index");
        // Demander confirmation à l'utilisateur
        if (confirm("Voulez-vous vraiment supprimer ce produit du panier ?")) {
            panier.splice(index, 1);
            localStorage.setItem(`panier_${email}`, JSON.stringify(panier));
            AfficherLePanier(panier);
            totalPrice()
            updateCartCount(panier.length); // Mettre à jour le compteur du panier

            // Afficher un toast de confirmation
            const toast = document.getElementById('toast_panier');
            toast.textContent = "Le produit est supprimé du panier !";
            toast.className = 'toast show';
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
        }
    }
});

// la somme total dans le panier

 export function totalPrice(){
    const livraison = 55
    const totalElement = document.querySelector(".total_price");
    const total_resume_commande = document.querySelector(".total_resume_commande");
    const subtotal_resume_commande = document.querySelector(".subTotal_resume_commande");
    const sousTotal = document.querySelector(".sous_total");

    const total = panier.reduce((acc, produit) => acc + (produit.price * produit.quantity), 0);
    totalElement.textContent = ` ${(total + livraison).toFixed(2)}€`;
    sousTotal.textContent = ` ${total.toFixed(2)}€`;

   
}
   

totalPrice(); // Mettre à jour le prix total
      





























// const plus_produit = document.getElementById("plus_produit");
// const moins_produit = document.getElementById("moins_produit");
// const quantitéChoisi = document.querySelector(".quantité");
// let panier = JSON.parse(localStorage.getItem("panier"))
// const panierContainer = document.getElementById("cart_table_body");

//     console.log(panier)

//   const AfficherLePanier = (panier) => {
      
//         panierContainer.innerHTML = "";

//         if (panier && panier.length > 0) {

//             panier.forEach((produit) => {

//                 const produitElement = document.createElement("tr");
//                 produitElement.innerHTML = `
                
//                    <td class="d-flex align-items-center">
//                         <img src="/Ressources/images/cat_women_10.png" class="product-img me-3">
//                         <div class="text-start">
//                         <strong>${produit.title}</strong><br>
//                         <small>Color: Yellow</small><br>
//                         <small>Size: ${produit.size}</small>
//                         </div>
//                     </td>
//                     <td><strong>${produit.price}</strong></td>
//                     <td>
//                         <div class="quantity-control justify-content-center">
//                         <button class="btn  btn-sm" id="moins_produit">-</button>
//                         <span class="quantité" >${produit.quantity}</span>
//                         <button class="btn  btn-sm" id="plus_produit">+</button>
//                         </div>
//                     </td>
//                     <td>FREE</td>
//                     <td><strong classe:"somme_partielle">$29.00</strong></td>
//                     <td><i class="bi bi-trash trash-icon"></i></td>

//                 `;
//                 panierContainer.appendChild(produitElement);
//             });
//         } else {
//             panierContainer.innerHTML = `<p class:"text-align-center m-5" >Votre panier est vide.</p>`;
//         }


//     }

//  AfficherLePanier();







// function UpdateQuantité() {
    
//     let quantité  = 1
//     plus_produit.addEventListener("click", () => {
//     quantité += 1;
//     console.log(quantité)
//     quantitéChoisi.innerHTML = quantité;
   
        
//     });

//     moins_produit.addEventListener("click", () => {
      
//         if (quantité > 1) {
//             quantité -= 1;
//         }
//           console.log(quantité)
//           quantitéChoisi.innerHTML = quantité;
//     });

     
     
// }

// UpdateQuantité()