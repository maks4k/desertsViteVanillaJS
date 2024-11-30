import {getItem,addItem } from "./api";


export const renderCartItem=async(item)=>{  
const responce=await getItem(`/api/cart/${item.id}`);//запрос на cart есть ли item с таким названием
if (responce !==null) {
 item.qty+=1;
 document.querySelector(`.cart-item[data-id="${item.id}"] .quantity`).textContent=item.qty; 
}
else{
  item.qty=1;
  const responce=await addItem("/api/cart",item);//отправляет fetc запрос методом POST на добавление товара в корзину,в первые 
  const item=`<li class="cart-item" data-id="${item.id}">
  <img width="25%" class="image" src="${responce.image.thumbnail}">
   <span>${responce.name}</span>
   <span><label class="quantity">${responce.quantity}</label> x <label class="price">$${responce.price.toFixed(2)}</label></span>
   <img class="remove-item" src="src/assets/icons/icon-remove-item.svg" alt="remove">
  </li>`
document.querySelector(".cart-items").insertAdjacentHTML("beforeend",item); 
} 
    // if (responce instanceof Object)//проверка на то пришел ли объект или нет
    // {
   
    // }else{
    //   alert(responce)
    // }
    
}