

// burguer


const burguer = document.querySelector('.burguer');
const navigation = document.querySelector('header nav');
const profil = document.querySelector('.profil');


burguer.addEventListener('click', () => {
  
  navigation.classList.toggle('active');
  profil.classList.toggle('active');

});

// burguuer left

const page_filtre = document.querySelector('.filtre');
const bloc_burguer_left = document.querySelector('.bloc_burguer_left');

 if(bloc_burguer_left) {

    bloc_burguer_left.addEventListener('click', () => {
  
        page_filtre.classList.toggle('active');
        bloc_burguer_left.classList.toggle('active');
  
    });
 }


// ---------------------fetch donnee-----------------------


import {categories , w_products} from "../data/data.js" ;
import {categorie_item ,women_item,Detail_product} from "../Assets/template.js"



// -----------------afficher les w_product -------------------------



let w_products_data = w_products ; 
// let w_products_data = w_products.slice(0,3) ; 


const list_women = document.querySelector(".cat_for_man");


localStorage.setItem("product", JSON.stringify(w_products));



const afficherWomenProduct = () => {


   w_products_data.forEach((w_product) =>{
    
     
    //  console.log(w_product);
     const cat_for_man_item = document.createElement("div");
     cat_for_man_item.setAttribute("data-id",w_product.id );
     cat_for_man_item.classList = "cat_for_man_item col-6 col-md-4";
     cat_for_man_item.innerHTML = women_item(w_product);

     if (list_women) {

       list_women.appendChild(cat_for_man_item);
       
       cat_for_man_item.addEventListener('click' , () => {

       window.location.href= `/products.html?id=${w_product.id}`

     } )

     }
    
   })

}

afficherWomenProduct(w_products_data)


// -----------------afficher les categorie----------------------


let categories_data = categories ;

const list_categorie = document.querySelector(".filtre_categorie ul");


const afficherCategorie = () => {

   categories_data.forEach( (categorie) => {
      //  console.log(categorie)
       const li_categorie = document.createElement("li");
       li_categorie.innerHTML = categorie_item(categorie);

       if(list_categorie) {
           list_categorie.appendChild(li_categorie);
       }
   } )
}

afficherCategorie(categories_data);

// si l'utilisateur est connection le rediriger vers la page de son compte sinon sur sign_in

const compte = document.getElementById("compte");

if(compte){
    compte.addEventListener('click' , () => {
        const utilisateurConecter = localStorage.getItem('utilisateurConnecte');

        if(utilisateurConecter){
            window.location.href = "/Pages/Contact_detail.html";
        } else {
            window.location.href = "/Pages/Sign_in.html";
        }

      
    });
}


