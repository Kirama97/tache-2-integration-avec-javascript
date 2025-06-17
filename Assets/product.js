
import {categories , w_products} from "../data/data.js" ;
import {categorie_item ,women_item,Detail_product} from "../Assets/template.js"

  
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const detail_page = document.querySelector('.product_detail_page');

 

    function afficherDetail(id){
      const product = w_products.find(a => a.id == id);
      const main_detail = document.querySelector('.main_detail');
      
      if (product) {
   
        main_detail.innerHTML = Detail_product(product);

        // pour afficher la taille des produit 
        const detail_size_select_box = document.querySelector(".detail_size_select_box");
          
        function afficherTailles (){

                 product.size.forEach( (taille) =>{
                    // console.log(taille)
                    const div = document.createElement("div");
                    div.className = "detail_size_select_box_item";
                    div.setAttribute("data-size", taille);
                    div.textContent = taille;
                    detail_size_select_box.appendChild(div)
                } )
            
            } 
        afficherTailles(product);

        // je veux afficher les couleur 

        const detail_color_available = document.querySelector(".detail_color_available");

        function afficherCouleur (){

                 product.color.forEach( (color) =>{
                    // console.log(color)
                    const div = document.createElement("div");
                    div.className = "detail_color_item";
                    const span = document.createElement("span");
                    div.setAttribute("data-color", color);
                    span.style.backgroundColor = color ;
                    div.appendChild(span)
                    detail_color_available.appendChild(div)
                } )
            
            } 
        afficherCouleur(product);

        // afficher les filtre

         let w_product_filtrer = w_products.slice(2,10) ;
  
        //  console.log(w_product_filtrer);


           const filtrer_produit  = () =>{

                
                const filter_product = document.querySelector(".filter_product");

                w_product_filtrer.forEach((product) => {

                    const cat_for_man_item = document.createElement("div");
                    cat_for_man_item.setAttribute("data-id",product.id );
                    cat_for_man_item.classList = "cat_for_man_item col-6 col-md-3";
                    cat_for_man_item.innerHTML = women_item(product);
                    filter_product.appendChild(cat_for_man_item);
                    
                    cat_for_man_item.addEventListener('click' , () => {

                    window.location.href= `/pages/products.html?id=${product.id}`

                    } )


                })

                }

        filtrer_produit(w_product_filtrer)  ;




        // creation du panier 


            
        let panier = JSON.parse(localStorage.getItem("panier")) || [];

        // ---------------ajouter panier --------------
        
        const ajouterPanier = (product) => {
            const Ajouter_au_panier = document.querySelector(".detail_btn_add");

            let selectedSize = null;
            let selectedColor = null;

            // taille
            document.querySelectorAll('.detail_size_select_box_item').forEach(item => {
                item.addEventListener('click', function() {
                    selectedSize = item.dataset.size;
                    document.querySelectorAll('.detail_size_select_box_item').forEach(i => i.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });

            // couleur
            document.querySelectorAll('.detail_color_item').forEach(item => {
                item.addEventListener('click', function() {
                    selectedColor = this.dataset.color;
                    document.querySelectorAll('.detail_color_item').forEach(i => i.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });

            Ajouter_au_panier.addEventListener('click', () => {
                if (selectedColor && selectedSize) {
                    // Chercher si le produit existe déjà (même id, taille, couleur)
                    const index = panier.findIndex(item =>
                        item.id === product.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    );

                 

                    if (index !== -1) {
                      
                        panier[index].quantity += 1;
                    } else {
                      
                        const productAajouter = {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            size: selectedSize,
                            color: selectedColor,
                            image: product.image,
                            quantity: 1,
                        };
                        panier.push(productAajouter);
                    }

                    localStorage.setItem("panier", JSON.stringify(panier));
                    showToast("Produit ajouté au panier !");
                   
                    updateCartCount()
                    Ajouter_au_panier.setAttribute("disabled", "true");
                    Ajouter_au_panier.style.backgroundColor = "#ccc"; 
                    Ajouter_au_panier.textContent = "Déja au panier"; 
                } else {
                    showToast_error("Veuillez sélectionner une taille et une couleur.");
                }
            });

            
   

          
        }

        ajouterPanier(product);
          console.log(panier); 
   
    } else {
        main_detail.innerHTML = "Aucun article trouvé";
    }

  }





// --


     if(productId){

      afficherDetail(productId) ;
     
    }

        //   compteur du panier 


   export   function updateCartCount() {
            const panier = JSON.parse(localStorage.getItem("panier")) || [];
            // Compte le nombre de produits différents (longueur du tableau)
            const totalCount = panier.length;
            const compteur = document.querySelector('.compter_panier');
            if (compteur) {
                compteur.textContent = totalCount;
            }
    }

     updateCartCount()

    //  mesage alert toast 


        function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000); 
    }
        function showToast_error(message) {
        const toast = document.getElementById('toast_error');
        toast.textContent = message;
        toast.className = 'toast_error show';
        setTimeout(() => {
            toast.className = 'toast_error';
        }, 2000); 
    }



