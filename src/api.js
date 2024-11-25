
export const getItems = async (url) => {
  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error("ошибка запроса на сервер");
    } //условия запрса на сервер ,что бы у cors всегда был статус 200(успешно)
    const data = await responce.json();
    return data;
  } catch (error) {
    return error.message;
  }
}; //класический fetc запрос на локальный сервис

export const getItem=async (url) => {
  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error("ошибка запроса на сервер");
    } //условия запрса на сервер ,что бы у cors всегда был статус 200(успешно)
    const data = await responce.json();
    return data;
  } catch (error) {
    return error.message;
  }
}; //класический fetc запрос на локальный сер






export const addItem=async(url,item)=>{
  try {
  const responce=await fetch(url,{
    method:"POST",//метод на сохранение данных
    headers:{
      "Content-type":"application/json"//тип контента который мы пердаем (json файл)
    },
    body:JSON.stringify(item)
  });
  if (!responce.ok) {
    throw new Error("ошибка запроса");
  }
  return await responce.json();
    }
catch (error) {
return error.message;
  } 
}//запрос на добавление товара





export const removeItem=async(url)=>{
  try {
  const responce=await fetch(url,{
    method:"DELETE",//метод на удаление данных
  });
  if (!responce.ok) {
    throw new Error("ошибка запроса");
  }
  else{
    return responce.ok
  }
    }
catch (error) {
return error.message;
  } 
}//запрос на удаление товара из корзины


// removeItem("/api/1");

// getItems("/api/products");
// getItems("/api/cart");//запрос на корзину



// const printItem = (item, parent, position) => {
//   document.querySelector(parent).insertAdjacentHTML(position, item);
// };//функция рендера
// const productsHandler = (products) => {
//   if (products.length > 0) {
//     //проверка на то что существует ли масив products
//     products.forEach((product) => {
//       const productMockup = `<div class="product">
//     <picture>
//     <source srcset="${product.image.desktop}" media="(min-width:1024px)">
//     <source srcset="${product.image.tablet}" media="(min-width:768px)">
//     <source srcset="${product.image.mobile}" media="(min-width:320px)">
//     <source srcset="${product.image.thumbnail}" media="(min-width:0px)">
//     <img src="${product.image.desktop}" alt="${product.name}"></img>
//    </picture>
//           <h2>${product.name}</h2>
//           <p>${product.price}</p>
//           <button data-id="${product.id}"><img src="./src/assets/icons/icon-add-to-cart.svg"class="add-to-cart" alt="">
//             <span>Add to Cart</span>
//           </button>
//         </div>`
//       // printItem(productMockup, ".product-list", "beforeend");
//     });
//   } else {
//     alert("Ошибка получения товаров");
//   }
// };

// const asyncWraper = async () => {
//   // const products = await getItems("http://localhost:3001/products");
//   // productsHandler(products); //передаем в качестве параметра produts(ссылку на базу данных),проходисмся циклом по этшй базе данных и по каждому элементу product,отрисовываем в верстке те измениия product
// };
// asyncWraper();

// 2 способ запусить аснхроность ,раньше синхроноссти через then

// getItems("http://localhost:3001/products").then((products)=>{
//   productsHandler(products);
// })