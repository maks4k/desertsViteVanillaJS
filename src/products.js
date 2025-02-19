import { getItems } from "./api";
import { getItem } from "./api";
import { addCartItem } from "./cart";

const productList= document
.querySelector(".product-list");

const getProducts=(async()=>{
  const responce = await getItems("/api/products");
  if (Array.isArray(responce)&&responce.length>0)//проверяем на то что пришел масив и его длинна больше 0
    {
    renderProducts(responce);
  }
  else
  {alert(responce)};
})
();
const renderProducts=async (products) => { 
    const productsMarckUp =products.map(
      (product) =>`<div class="product">
        <picture>
        <source srcset="${product.image.desktop}" media="(min-width:1024px)">
        <source srcset="${product.image.tablet}" media="(min-width:768px)">
        <source srcset="${product.image.mobile}" media="(min-width:320px)">
        <source srcset="${product.image.thumbnail}" media="(min-width:0px)">
        <img src="${product.image.desktop}" alt="${product.name}"></img>
       </picture>
              <h2>${product.name}</h2>
              <span><i>Category:</i>${product.category}</span>
              <p>${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}">
              <img src="./src/assets/icons/icon-add-to-cart.svg" alt="">
              <span>Add to Cart</span>
              </button>
            </div>`,
    );//дата арибут data-id="${product.id}
   
  productList.insertAdjacentHTML("beforeend", productsMarckUp.join(""));//применяем join ,что бы удалить запятые которые появились из-за метода map
};




const prepareProduct=async(e)=>{
if (e.target.matches(".add-to-cart, .add-to-cart *")){
   const id=e.target.closest(".product").querySelector("button").dataset.id;
   const responce=await getItem(`/api/products/${id}`,async(responce)=>{
    if(!responce.ok){
      throw new Error("Ошибка получения данных"); 
    }
    const data=await responce.json()
    return data;
   });//добираемся до товаров (через jsonplaceholder обращаемся через апи/что то там/и подаставляем айдиншник товара на кторой кликнули)в данном моменте вызываются product,так же добавили помимо url выполнение какой то callback функции
   if (responce instanceof Object) {
    return responce;
   }else{
    alert(responce);
    return false;
   }  
}
}
productList.addEventListener("click", async(e)=>{const responce=await prepareProduct(e);
  if (responce) {
    const product=responce
    addCartItem(product)}//происходит последовательность действий сначала при клики выполняется prepareProduct.котороый выполняет свои деййствия и мы сохраняем их в константу а далее мы эти действия прокидываем в другую функци. из cart js
  });
 