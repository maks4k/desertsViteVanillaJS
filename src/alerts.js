export const showNotificathion=(mes)=>{
const notificathion=document.querySelector(".notoficathion");
notificathion.textContent=mes;
notificathion.classList.remove("hidden");
notificathion.classList.add("show");

setTimeout(()=>{
    notificathion.classList.remove("show");
    notificathion.classList.add("hidden");
},2000)
};//кастомный алерт