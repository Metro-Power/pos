//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};
//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};


//Cart Working JS
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}

//Making Function
function ready(){
//Remove Item from cart
var removecartbuttons =document.getElementsByClassName('cart-remove')
console.log(removecartbuttons)
for(var i=0;i <removecartbuttons.length;i++){
    var button =removecartbuttons[i]
    button.addEventListener('click',removecartitem)
}
//quantity Change
var quantityInputs=document.getElementsByClassName('cart-quantity')
for(var i=0;i <quantityInputs.length;i++){
var input=quantityInputs[i]
input.addEventListener('change',quantityChanged);
}
//Add to Carts
var AddCart =document.getElementsByClassName('add-cart')
for(var i=0;i <AddCart.length;i++){
var button =AddCart[i]
button.addEventListener('click',addcartclicked);
}
//Buy button work
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
}
//buy button
function buyButtonClicked(){
    alert("You Order is Placed")
    var Cartcontent=document.getElementsByClassName("cart-content")[0]
    while(Cartcontent,hasChildNodes()){
        Cartcontent.removeChild(Cartcontent.firstChild);
    }
    updatetotal();
}
//Remove Item from cart
function removecartitem(event){
    var buttonClicked =event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}
// quantity Change
function quantityChanged(event){
    var input =event.target
     if(isNaN(input.value) || input.value <= 0){
        input.value=1
     }
     updatetotal();

}
//Add to Cart
function addcartclicked(event){
    var button =event.target
    var shopProducts =button.parentElement
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price=shopProducts.getElementsByClassName("price")[0].innerText;
    var productimg=shopProducts.getElementsByClassName("product-img")[0].src;
    addproductToCart(title,price,productimg);
    updatetotal();
}

function addproductToCart(title,price,productimg){
    var cartShopBox =document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItem =document.getElementsByClassName("cart-content")[0];
    var cartItemsNames=cartItem.getElementsByClassName("cart-product-title");
    for(var i=0;i <cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText==title){
        alert("You have already add this item to Cart");
        return;
        }
    }
    var CartboxContent = `
                         <img src="${productimg}" alt="" class="cart-img">
                         <div class="detial-box">
                         <div class="cart-product-title">
                         ${title}
                         </div>
                         <div class="cart-price">${price}</div>
                         <input type="number"value="1" class="cart-quantity" >
                         </div>
                         <!--Remove cart-->
                         <i class='bx bxs-trash-alt cart-remove' ></i>`;
             
cartShopBox.innerHTML= CartboxContent;
cartItem.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removecartitem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);
    

}


// update total
function updatetotal(){
    var Cartcontent =document.getElementsByClassName('cart-content')[0]
    var cartBoxes=Cartcontent.getElementsByClassName('cart-box')
    var total=0;
    for (var i=0;i <cartBoxes.length;i++){
        var cartBox = cartBoxes[i]
        var priceElement =cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement =cartBox.getElementsByClassName('cart-quantity')[0]
        var price=parseFloat(priceElement.innerText.replace("KS",""))
        var quantity =quantityElement.value 
        total=total+(price*quantity); 
    }
        // If price Contain some Cents Value 
        total =Math.round(total*100)/100;

        document.getElementsByClassName('total-price')[0].innerText="KS" +total;
    
}