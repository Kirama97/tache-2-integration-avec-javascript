let currentSlide = 0;
const totalCards = 12;
const visibleCards = 4;
const maxSlide = totalCards - visibleCards;

function slide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;

  const sliderTrack = document.getElementById('sliderTrack');
  const slideWidth = sliderTrack.offsetWidth / visibleCards;
  sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}



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

bloc_burguer_left.addEventListener('click', () => {

   page_filtre.classList.toggle('active');
   bloc_burguer_left.classList.toggle('active');
})





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
    
     
     console.log(w_product);
     const cat_for_man_item = document.createElement("div");
     cat_for_man_item.setAttribute("data-id",w_product.id );
     cat_for_man_item.classList = "cat_for_man_item col-6 col-md-4";
     cat_for_man_item.innerHTML = women_item(w_product);
     list_women.appendChild(cat_for_man_item);
       
     cat_for_man_item.addEventListener('click' , () => {

       window.location.href= `/pages/products.html?id=${w_product.id}`

     } )

   })

}

afficherWomenProduct(w_products_data)

// ---------------afficher detail du product --------------















// -----------------afficher les categorie----------------------


let categories_data = categories ;

const list_categorie = document.querySelector(".filtre_categorie ul");


const afficherCategorie = () => {

   categories_data.forEach( (categorie) => {
      //  console.log(categorie)
       const li_categorie = document.createElement("li");
       li_categorie.innerHTML = categorie_item(categorie);
       list_categorie.appendChild(li_categorie);

   } )

}

afficherCategorie(categories_data);