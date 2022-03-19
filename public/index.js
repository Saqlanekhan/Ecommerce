if(localStorage.getItem('email')==null){
document.getElementById('hide').style.display="none"
document.getElementById('hide_logout').style.display='none'

}else{
    document.getElementById('hide_login').style.display="none"

}

var logout=document.getElementById('hide_logout').addEventListener('click',()=>localStorage.removeItem('email'))
let total;
let current_page=1
let limit=4

const container=document.getElementById('music-content');

a(1)
function nextP(){
    container.innerHTML=""
    current_page++
   document.getElementById('current_page').innerText=current_page
   a(current_page)
    console.log('next called')
}
function prevP(){
    container.innerHTML=""
    current_page--;
    document.getElementById('current_page').innerText=current_page
    a(current_page)
    console.log('prev called')
}

function a(current_page){
    axios.get(`http://localhost:3000/get_products?page=${current_page}&limit=${limit}`).then((res)=>{
        const mydata=res.data;
        
       
        console.log(mydata)
        if(mydata.length<=0){
            console.log('nonehbhj')
            alert('thst it')
            return
        }
        total=res.data[0].total;
    mydata.forEach((d)=>{
    create(d)
    })
    let   no_of_page=Math.ceil(total/limit)
    console.log('page no : '+no_of_page)
    console.log(current_page)
    if(no_of_page<1) no_of_page=1;
    if(no_of_page>total) page=total
    if(current_page==1){
       
      document.getElementById('prev').style.display='none'
      

    }else{
        document.getElementById('prev').style.display='inline-block'
    }
    if(current_page==no_of_page){
        document.getElementById('next').style.display='none'
    }else{
        document.getElementById('next').style.display='inline-block'
    }
    
    }).catch(er=>console.log(er))
}



function create(data){

let divv=document.createElement(`div`);
divv.setAttribute("id",`${data.name.split(' ')[0]}`)
divv.innerHTML=` <h3>${data.name}</h3>
<div class="image-container">
    <img class="prod-images" src="${data.image_url}" alt="">
</div>
                <div class="prod-details">
    <span>$<span>${data.price}</span></span>
    <button class="shop-item-button" type='button'>ADD TO CART</button>
</div>
 `;


container.appendChild(divv)
  
}



const cart_items = document.querySelector('#cart .cart-items');
document.addEventListener('click',(e)=>{
    
    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        console.log(id)
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        console.log(img_src)
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        console.log(price)
        let total_cart_price = document.querySelector('#total-value').innerText;
        console.log(total_cart_price)
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return 
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        console.log(cart_item)
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`


        cart_items.appendChild(cart_item)
       
        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
    if(localStorage.getItem('email')==null){
        alert('Please login') 
        return
    }


        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})



