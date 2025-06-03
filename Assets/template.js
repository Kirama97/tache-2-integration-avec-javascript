

export const Detail_product = (product) => {


    return ` 
    


          
  <!-- product_detail -->

  <section class=" section_detail">

   
   <div class="product_detail_container">

      <!-- left -->

      <div class="detail_product_left">

          <div class="detail_left_left">

             <div class="left_left_item">
               <img src="/Ressources/images/detail_small_img_1.png" alt="" srcset="">
             </div>

             <div class="left_left_item">
               <img src="/Ressources/images/detail_small_img_2.png" alt="" srcset="">
             </div>

             <div class="left_left_item">
               <img src="/Ressources/images/detail_small_img_3.png" alt="" srcset="">
             </div>

             <div class=" left_left_pagination">

                  <span>
                     <img src="/Ressources/icones/chevron-up.svg" alt="" srcset="">
                  </span>
                  <span>
                     <img src="/Ressources/icones/chevron-down.svg" alt="" srcset="">
                  </span>
               
             </div>

          </div>

          <div class="detail_left_img">
             <img src=${product.image} alt="" srcset="">
          </div>
      </div>

      <!-- right -->
      
      <div class="detail_product_right">
        
         <div class="detail_product_right_content">

            <div class="detail_product_right_content_top mb-3">
               <a   href="/index.html">Shop</a>
               <img src="/Ressources/icones/chevron-right.svg" alt="" srcset="">
               <a  href="/Pages/Women.html">Women</a>
               <img src="/Ressources/icones/chevron-right.svg" alt="" srcset="">
               <a  href="/Pages/Cart.html">Top<a>
            </div>

            <h1 class="detail_title">${product.title}</h1>

            <div class="detail_product_comment my-3">
               <div class="detail_product_comment_left">
                  <div class="detail_comment_start">
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                  </div>
                  <p>3.5</p>
               </div>
               <div class="detail_product_comment_right">

                  <img src="/Ressources/icones/commentaire.svg" alt="">
                  <p>120 comment</p>

               </div>
            </div>

            <div class="detail_size_select my-3">
               <h4>Select Size</h4>
               <p>Size Guide </p>
               <img src="/Ressources/icones/arrow-right.svg" alt="" srcset="">
            </div>

            <div class="detail_size_select_box">

                <div class="detail_size_select_box_item">XS</div>
                <div class="detail_size_select_box_item">S</div>
                <div class="detail_size_select_box_item">M</div>
                <div class="detail_size_select_box_item">L</div>
                <div class="detail_size_select_box_item">XL</div>
            </div>

            <div class="detail_size_select mt-5">
               <h4>Color Available</h4>
              
            </div>


            <div class="detail_color_available my-3">
               <div class="detail_color_item">
                  <span></span>
               </div>
               <div class="detail_color_item">
                  <span></span>
               </div>
               <div class="detail_color_item">
                  <span></span>
               </div>
               <div class="detail_color_item">
                  <span></span>
               </div>
            </div>

            <div class="detail_btn_cart">
               <button class="detail_btn_add">
                  <img src="/Ressources/icones/shopping-cart.svg" alt="" srcset="">
                  <a href="/Pages/Cart.html">Add to cart</a>
               </button>
               <button class="detail_btn_price">$63.00</button>
            </div>

            <div class="detail_paye py-3 mt-5">

                <div class="row g-3">

                   <div class="detail_paye_item col-5">
                      <div class="detail_paye_item_box">
                         <div class="pay_box_icone">
                            <img src="/Ressources/icones/payment_detail_icone_1.svg" alt="" srcset="">
                         </div>
                         <p>Secure payment</p>
                      </div>
                   </div>
                   <div class="detail_paye_item col-5">
                      <div class="detail_paye_item_box">
                         <div class="pay_box_icone">
                            <img src="/Ressources/icones/payment_detail_icone_2.svg" alt="" srcset="">
                         </div>
                         <p>Size & Fit</p>
                      </div>
                   </div>
                   <div class="detail_paye_item col-5">
                      <div class="detail_paye_item_box">
                         <div class="pay_box_icone">
                            <img src="/Ressources/icones/payment_detail_icone_3.svg" alt="" srcset="">
                         </div>
                         <p>Free shipping</p>
                      </div>
                   </div>
                   <div class="detail_paye_item col-5">
                      <div class="detail_paye_item_box">
                         <div class="pay_box_icone">
                            <img src="/Ressources/icones/payment_detail_icone_4.svg" alt="" srcset="">
                         </div>
                         <p>Free Shipping & Return</p>
                      </div>
                   </div>

                </div>

            </div>

         </div>
         
      </div>

  </div>


  </section>
      

   <!-- product description -->


   <section class="product_description">

      <div class="container ">

            <div class="new_arrival_top py-2">
                  <span>.</span>
                  <h1>Product Description</h1>
            </div>

            <div class="product_description_container py-5 ">


               <div class="product_description_container_left">

                  <div class="product_description_container_top ">

                     <div class="detail_top_item">
                           <p class="text-dark">Description</p>
                     </div>
                     <div class="detail_top_item">
                           <p>User comments</p>
                           <span class="badge1">21</span>
                     </div>
                     <div class="detail_top_item">
                           <p>Suestion & Answer</p>
                           <span >4</span>
                     </div>
                     <div class="detail_top_item"></div>

                  </div>

                  <p class=my-5>
                     100% Bio-washed Cotton – makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide  all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.
                  </p>


                  <div class="product_description_container_left_middle">
                     <div class="row ">
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Fabric</p>
                                 <h6>Bio-wash Cotton</h6>
                              </div>
                           </div>
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Pattern</p>
                                 <h6>Printed</h6>
                              </div>
                           </div>
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Fit</p>
                                 <h6>Regular-fit</h6>
                              </div>
                           </div>
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Neck</p>
                                 <h6>Round Neck</h6>
                              </div>
                           </div>
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Sleeve</p>
                                 <h6>Half-sleeves</h6>
                              </div>
                           </div>
                           <div class="col-6 col-md-4 product_left_middle_item">
                              <div class="">
                                 <p>Style</p>
                                 <h6>Casual Wear</h6>
                              </div>
                           </div>
                     </div>
                  </div>

               </div>

               <div class="product_description_container_right">

                  <div class="product_description_container_right_container">

                     <div></div>

                     <div class="play">
                           <img src="/Ressources/icones/play.svg" alt="" srcset="">
                     </div>

                     <p>Raven Hoodie with black colored design</p>

                  </div>
               </div>

            
                  
            </div>

      </div>


   </section>
   
    
    `

}


export const women_item = (w_product) =>{
    return `

    <div class="for_man_content d-block text-dark text-decoration-none">
        <img src=${w_product.image} alt="">

        <div class="for_man_descript">

            <div class="cat_for_man_descript_left">
                <h1>${w_product.title}</h1>
                <p>${w_product.brand} </p>
            </div>

            <div class="price_to_limelight">
                <p>$${w_product.price}</p>
            </div>

        </div>
     </div>
    `
}




export const categorie_item = (categorie) => {

  return `
    ${categorie.categorie_nom}  <img src="/Ressources/icones/fleche_droite.svg" alt="" srcset="">
  `



}
