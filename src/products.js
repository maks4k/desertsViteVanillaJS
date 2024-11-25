import { addItem, getItems } from "./api";
import { getItem } from "./api";

const productList= document
.querySelector(".product-list")
const renderProducts=(async () => {
  const responce = await getItems("/api/products");

  if (Array.isArray(responce)&&responce.length>0)//проверяем на то что пришел масив и его длинна больше 0
     {
    const productsMarckUp = responce.map(
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
              <button class="add-to-cart" data-id="${product.id}"><img src="./src/assets/icons/icon-add-to-cart.svg" alt="">
                <span>Add to Cart</span>
              </button>
            </div>`,
    );
   
    productList.insertAdjacentHTML("beforeend", productsMarckUp.join(""));//применяем join ,что бы удалить запятые которые появились из-за метода map
} else alert(responce);
})();//самовыызвающая функция




const prepareProduct=async(e)=>{
if (e.target.matches(".add-to-cart, .add-to-cart *")){
   const id=e.target.closest(".product").querySelector("button").dataset.id;
   const product=await getItem(`/api/products/${id}`);//добираемся до товаров 
   console.log(product);
  const responce=await addItem("/api/cart",product);//отправляет fetc запрос методом POST на добавление товара в корзину
  if (responce instanceof Object)//проверка на то пришел ли объект или нет
  {
    
  }else{
    alert(responce)
  }
}
}
productList.addEventListener("click",prepareProduct)