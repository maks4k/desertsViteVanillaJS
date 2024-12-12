import {getItem,addItem, updateItem } from "./api";


export const renderCartItem=async(item)=>{
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
responce.qty+=1;
const responceUpdate=await updateItem(`/api/cart/${item.id}`,{qty:responce.qty});//патч запрос 2 параметром принимает кол-во qty
if (responceUpdate instanceof Object) {
  document.querySelector(`.cart-item[data-id="${item.id}"] .quantity`,).textContent=responce.qty;
 }else{
  alert(responceUpdate);
  return false;
 }   
 
}
else{
  item.qty=1;
  const responceAdd=await addItem("/api/cart",item);//отправляет fetc запрос методом POST на добавление товара в корзину,в первые
  if (responceAdd instanceof Object) {
    const itemMarckup=`<li class="cart-item" data-id="${item.id}">
    <img width="25%" src="${item.image.thumbnail}" alt="item">
     <span>${item.name}</span>
     <span><label class="quantity">${item.qty}</label> x <label class="price">$${item.price.toFixed(2)}</label></span>
     <img class="remove-item" src="src/assets/icons/icon-remove-item.svg" alt="remove">
    </li>`;
    document.querySelector(".cart-items").insertAdjacentHTML("beforeend",itemMarckup);
   }else{
    alert(responceAdd);
    return false;
   }    
}}
