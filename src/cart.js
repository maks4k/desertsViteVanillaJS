import {getItem,addItem, updateItem, getItems, removeOrUpdateItem, removeItem } from "./api";
import {showNotificathion} from"./alerts";


const renderCartItem=(item)=>{
  const itemMarckup=`<li class="cart-item" data-id="${item.id}">
  <img width="25%" src="${item.image.thumbnail}" alt="item">
   <span>${item.name}</span>
   <span><label class="quantity">${item.qty}</label> x <label class="price">$${item.price.toFixed(2)}</label></span>
   <img class="remove-item" src="src/assets/icons/icon-remove-item.svg" alt="remove">
  </li>`;
  document.querySelector(".cart-items").insertAdjacentHTML("beforeend",itemMarckup);
}//функция отрисовки товаров при добавлении в корзину



const getCartItems=async()=>{
  const responce=await getItems(`/api/cart`);
  if (Array.isArray(responce)&&responce.length>0)//проверка на то что есть какой то массив в dbjson cart
  {
  return responce;
  }
  else if(!Array.isArray(responce)){
  alert(responce);
  }
  }//получает товары из корзины и позволяет сохранять товар при перезагрузки страницы
  


const updateTotals=async()=>{
const cart=await getCartItems();
const cartCount=document.querySelector(".cart-count");
const totalPrice=document.querySelector(".total-price")
if (cart) {
cartCount.textContent=cart.reduce((count,item)=>{
return count+item.qty;
},0);

totalPrice.textContent=`$`+cart.reduce((summ,item)=>{
return summ+item.qty*item.price;
},0).toFixed(2)
}else{
cartCount.textContent="0";
totalPrice.textContent="$0.00"
}
}//считает и выводит сумму товаров и кол-во




const updateCartQty=async(responce,item)=>{
  responce.qty+=1;
  const responceUpdate=await updateItem(`/api/cart/${item.id}`,{qty:responce.qty});//патч запрос 2 параметром принимает кол-во qty
  if (responceUpdate instanceof Object) {
    document.querySelector(`.cart-item[data-id="${item.id}"] .quantity`,).textContent=responce.qty;
   }else{
    alert(responceUpdate);
   }   
}

export const addCartItem=async(item)=>{
const responce=await getItem(`/api/cart/${item.id}`,async(responce)=>{
  if (!responce.ok) {
    return null;
  }
  else{
    const data=await responce.json();
    return data;
  }
});//запрос на cart есть ли item с таким названием,теперь запрос по универсальной функции ,сюда втоырм параметром приходит коллбэк функция(переделывали на уроке)
if (responce!==null) {
  updateCartQty(responce,item);
}
else{
  item.qty=1;
  const responceAdd=await addItem("/api/cart",item);//отправляет fetc запрос методом POST на добавление товара в корзину,в первые
  if (responceAdd instanceof Object) {
    renderCartItem(item);
   }else{
    alert(responceAdd);
    return false;
   }    
}
updateTotals();
}


const removeCartItem=async(event)=>{
if (event.target.matches(".remove-item")) {
  const cartItem=event.target.closest(".cart-item")
  const id=cartItem.dataset.id;
const updateItem=await removeOrUpdateItem(`/api/cart/${id}`);
if (updateItem&&updateItem.achion==="update") {
  cartItem.querySelector(".quantity").textContent=updateItem.item.qty;
}else if(updateItem&&updateItem.achion==="remove")
{
  event.target.closest(".cart-item").remove();//удалили товар
}
updateTotals();
  }
}
document.querySelector(".cart-items").addEventListener("click",(event)=>{
  removeCartItem(event);
  showNotificathion("Товар удален");
});//надо передать везде event потому что появилась обретка

document.querySelector(".confirm-order").addEventListener("click",async()=>{
const cart=await getCartItems()
  if (cart) {
    cart.forEach(async(item)=>await removeItem(`/api/cart/${item.id}`));//удаление товара из бэкэнда
    document.querySelector(".cart-items").innerHTML="";//очистка ui
    updateTotals();
    alert("Спасибо заказ оформлен")
  }else{
    alert("Ваша корзина пуста")
  }
})

document.addEventListener("DOMContentLoaded",async()=>{
const items=await getCartItems();
if (items)
 {
  items.forEach(item=>{
  renderCartItem(item);
  })//запускаем форыч потому  что responce это масив объектов а rendercartitem ждет только 1 элемент
  
}
})//запускаем функции только тогда когда загрузился весь домконтент