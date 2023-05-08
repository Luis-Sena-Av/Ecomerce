// consumir api
const url="https://ecommercebackend.fundamentos-29.repl.co/";
async function getcharaters(url){
    try {
        const data=await fetch(url);
        const resolv= await data.json();
        window.localStorage.setItem("products",JSON.stringify(resolv)); 
        return resolv;   
        
    } catch (error) {
        console.log(error);
    }
}

function mostrarProductos(stocktaking){
    let html="";
    for (const {category,description,id,image,name,price,quantity } of stocktaking) {
      
        if(quantity>0){
            html+=`
        <div class="container_producto ${category}">
            <div class="producto">
                <img src="${image}" alt="${name}">       
            </div>
            <div class="descripcion ">
                    <h3>$${price}.00 <span>Stock: ${quantity}</span></h3>
                    <a href="#">${name} | <span>${category}</span></a>
                    <i class='bx bx-plus' id="${id}"></i>
            </div> 
            
        </div>                 
        `;
        }else{
            html+=`
            <div class="container_producto ${category}">
                <div class="producto">
                    <img src="${image}" alt="${name}">  
                    <p class="agotado">Producto agotado</p>    
                
                </div>
                <div class="descripcion ">
                        <h3>$${price}.00 <span>Stock: ${quantity}</span></h3>
                        <a href="#">${name} | <span>${category}</span></a>
                </div> 
                
            </div>                 
            `;
        }
        
        
    }
    const stockproducts=document.querySelector(".productos")
    stockproducts.innerHTML=html;
}

function menuFiltro(){ mixitup = mixitup(".productos", {
    selectors: {
        target: '.container_producto'
    },
    animation: {
        duration: 150
    }
}); 
}

function carro(){
    const comprar=document.querySelector(".bx-cart")
    const comprar1=document.querySelector(".canti")
    const cerarHtml=document.querySelector(".cerrar")
    const main_comprar=document.querySelector(".cart-com")
   
    comprar.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    comprar1.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    cerarHtml.addEventListener('click',function(){
        main_comprar.classList.remove("mostrar")
    });
}

function pinatrCart(cart){
    const cart_comHtml= document.querySelector(".producSelec");
    const compra_comHtml= document.querySelector(".comparProduc .producs");
    const comprar1=document.querySelector(".canti")
    let can_produc=0;
    let totalpagar=0;
    for (const {cantidadProd,price} of Object.values(cart)) {
        can_produc+=cantidadProd;
        totalpagar+=cantidadProd*price
    }
    let html=``;
    let html1=``;
    for (const productoSel of Object.values(cart)) {
    
        html+=`<div class="prodaComp">
        <div class="cart-image">
                <img src="${productoSel.image}" alt="${productoSel.name}">
            </div>
            <div class="cart-info">
                <h4>${productoSel.name}</h4>
                <p><span>Stock: ${productoSel.quantity}</span> | $${productoSel.price}.00</p>
                <p>Subtotal:$ ${productoSel.cantidadProd*productoSel.price}.00</p>
                <div class="actions">
                    <i class='bx bx-minus ${productoSel.id}'></i>
                    <span>${productoSel.cantidadProd}  Units</span>
                    <i class='bx bx-plus ${productoSel.id}'></i>
                    <i class='bx bx-trash ${productoSel.id}'></i>
                </div> 
            </div>        
        </div>`;            
    }
 
    if(can_produc===1){
        html1=`<p class="ff"> ${can_produc} producto <span>$${totalpagar}.00</span></p>`;  
    }
    if(can_produc!==1){
        html1=`<p class="ff"> ${can_produc} productos <span>$${totalpagar}.00</span></p>`;        
    }
    comprar1.textContent=can_produc;    
    cart_comHtml.innerHTML=html;
    compra_comHtml.innerHTML=html1;
}


function alCarroPrincipal(stocktaking){
    const productHtml= document.querySelector(".productos");
    const actionsHtml= document.querySelector(".producSelec");
    const comprarHtml= document.querySelector(".compra");
    let cart=JSON.parse(window.localStorage.getItem("Prodselect"))||{};
    
    
    productHtml.addEventListener('click',function(e){
        if(e.target.classList.contains("bx-plus")){
            const id=Number(e.target.id);
            const productClic=stocktaking.find(element => element.id ===id);
          
            if(cart[productClic.id]){
                if(cart[productClic.id].cantidadProd===productClic.quantity){
                    alert("No hay mas de estos en el stock");
                }else{
                    cart[productClic.id].cantidadProd++;
                }
                 
            }else{
                cart[productClic.id]={...productClic,cantidadProd:1}
            }
            window.localStorage.setItem("Prodselect",JSON.stringify(cart)); 
            console.log(cart); 
            pinatrCart(cart)  
        }
          
       
    });
    
    actionsHtml.addEventListener('click',function(e){
        console.log(e.target.classList);
        if(e.target.classList.contains("bx-minus")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
            if(productClic.cantidadProd===1){
                confirm("Desea eliminar el producto")
                delete cart[productClic.id];
                
            }else{
                cart[productClic.id].cantidadProd--;
            }
        }
        if(e.target.classList.contains("bx-plus")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
            if(productClic.cantidadProd===productClic.quantity){
                confirm("No tenemos mas de estos en el stock")
            }else{
                cart[productClic.id].cantidadProd++;
            }
        }
        if(e.target.classList.contains("bx-trash")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
                confirm("Desea eliminar el producto del carrito")
                delete cart[productClic.id];
        }
        window.localStorage.setItem("Prodselect",JSON.stringify(cart));
        pinatrCart(cart);
    });

    comprarHtml.addEventListener('click',function(e){
        for (const produc of Object.values(cart)) {

            const id=produc.id;
            if(stocktaking[produc.id-1].id===produc.id){
                stocktaking[produc.id-1].quantity=stocktaking[produc.id-1].quantity-produc.cantidadProd  
                console.log("Hola")
            }
            console.log(stocktaking[produc.id-1]);
            console.log(produc);
            console.log(stocktaking[produc.id-1].quantity);
        }
        cart={};
        window.localStorage.setItem("Prodselect",JSON.stringify(cart));
        window.localStorage.setItem("products",JSON.stringify(stocktaking));
        pinatrCart(cart);
        mostrarProductos(stocktaking);
        
    });
    
}

function animanavbar(){
    const dia=document.querySelector(".bx-sun");
    const anima= document.querySelector("header");
    if(dia.classList.contains("darkmodeoff")){
        document.addEventListener('scroll',function(){
            if(window.scrollY>100){
                anima.classList.remove("anima-headrdark")
                anima.classList.add("anima-headr")
            
            }else{
                anima.classList.remove("anima-headrdark")
                anima.classList.remove("anima-headr")
                
        
            }
        });
    }else{
        document.addEventListener('scroll',function(){
        if(window.scrollY>100){
            anima.classList.remove("anima-headr")
            anima.classList.add("anima-headrdark")
    
        }else{
            anima.classList.remove("anima-headr")
            anima.classList.remove("anima-headrdark")
        }
        });

    }
    
}

function darkmode(){
    const noche=document.querySelector(".bx-moon");
    const dia=document.querySelector(".bx-sun");
    const bodyHtml=document.querySelector("body");
    const homeHtml=document.querySelector(".home");
    const newcolecHtml=document.querySelector(".newcolec");
    const productsHtml=document.querySelector(".productos");
    const imagenewc=document.querySelector(".imgnewcolec");
    const ancor=document.querySelector("#a");
    const ancor1=document.querySelector("#a1");
    const ancor2=document.querySelector("#a2");
    const countcarhtml=document.querySelector(".canti");
    const anima= document.querySelector("header");
    const filtrHtml= document.querySelector(".shirt");
    const filtrHtml1= document.querySelector(".all");
    const filtrHtml2= document.querySelector(".hoddie");
    const filtrHtml3= document.querySelector(".sweater");
    //noche 
    noche.addEventListener('click',function(){
        if(window.scrollY>100){
            anima.classList.remove("anima-headr")
            anima.classList.add("anima-headrdark")
        }
        noche.classList.toggle("darkmodeoff");
        dia.classList.toggle("darkmodeoff");
        bodyHtml.classList.toggle("bodydark");
        homeHtml.classList.toggle("homedark");
        newcolecHtml.classList.toggle("newcolecdark");
        productsHtml.classList.toggle("productosdark");
        imagenewc.classList.toggle("imgnewcolecdark");
        ancor.classList.toggle("adrk");
        ancor1.classList.toggle("adrk");
        ancor2.classList.toggle("adrk");
        countcarhtml.classList.toggle("cantidark");
        filtrHtml.classList.toggle("f1");   
        filtrHtml1.classList.toggle("f1");    
        filtrHtml2.classList.toggle("f1");  
        filtrHtml3.classList.toggle("f1");     
        animanavbar()
       


    });
    // dia
    dia.addEventListener('click',function(){
        if(window.scrollY>100){
            anima.classList.remove("anima-headrdark")
            anima.classList.add("anima-headr")
        }
        dia.classList.toggle("darkmodeoff");
        noche.classList.toggle("darkmodeoff");
        bodyHtml.classList.toggle("bodydark");
        homeHtml.classList.toggle("homedark");
        newcolecHtml.classList.toggle("newcolecdark");
        productsHtml.classList.toggle("productosdark");
        imagenewc.classList.toggle("imgnewcolecdark");
        ancor.classList.toggle("adrk");
        ancor1.classList.toggle("adrk");
        ancor2.classList.toggle("adrk");
        countcarhtml.classList.toggle("cantidark");
        filtrHtml.classList.toggle("f1");  
        filtrHtml1.classList.toggle("f1");  
        filtrHtml2.classList.toggle("f1");  
        filtrHtml3.classList.toggle("f1");  
        animanavbar()
    
    });

}

async function main (){
    let stocktaking=JSON.parse(window.localStorage.getItem("products")) || await getcharaters(url);
    let cart=JSON.parse(window.localStorage.getItem("Prodselect"))||{};
    window.localStorage.setItem("cart",JSON.stringify(cart));
    mostrarProductos(stocktaking)
    menuFiltro()
    carro(cart)
    alCarroPrincipal(stocktaking);
    pinatrCart(cart)
    animanavbar()
    darkmode()
}

main();