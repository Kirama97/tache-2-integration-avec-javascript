
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
                    console.log(taille)
                    const div = document.createElement("div");
                    div.className = "detail_size_select_box_item";
                    div.textContent = taille;
                    detail_size_select_box.appendChild(div)
                } )
            
            } 
        afficherTailles(product);

        // je veux afficher les couleur 

        const detail_color_available = document.querySelector(".detail_color_available");

        function afficherCouleur (){

                 product.color.forEach( (color) =>{
                    console.log(color)
                    const div = document.createElement("div");
                    div.className = "detail_color_item";
                    const span = document.createElement("span");
                    span.style.backgroundColor = color ;
                    div.appendChild(span)
                   
                    detail_color_available.appendChild(div)
                } )
            
            } 
        afficherCouleur(product);

        














   
    } else {
        main_detail.innerHTML = "Aucun article trouvé";
    }

  }

     if(productId){

      afficherDetail(productId) ;
     
    }



    // afficher les tailles 







