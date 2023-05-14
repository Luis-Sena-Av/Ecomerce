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

// La función mostrarProductos muestra los productos el array stocktaking en la pantalla principal
function mostrarProductos(stocktaking){
    let noche=JSON.parse(window.localStorage.getItem("noche"))||{};
    let html="";
    if(Object.values(noche).includes("darkmodeoff")){
        for (const {category,id,image,name,price,quantity } of stocktaking) {
      
            if(quantity>0){
                html+=`
            <div class="container_producto  container_productodark">
                <div class="producto backdroundark">
                    <img src="${image}" alt="${name}">       
                </div>
                <div class="descripcion descripciondark">
                        <h3 class="blanco1">$${price}.00 <span>Stock: ${quantity}</span></h3>
                        <a  class="blanco mode" id="${id}">${name} | <span>${category}</span></a>
                        <i class='bx bx-plus' id="${id}"></i>
                </div> 
                
            </div>                 
            `;
            }
            
            if(quantity===0){
                html+=`
                <div class="container_producto  container_productodark">
                    <div class="producto backdroundark">
                        <img src="${image}" alt="${name}">  
                             <p class="agotado">Producto agotado</p>    
                        </img>
                    </div>
                    <div class="descripcion descripciondark">
                            <h3 class="blanco1">$${price}.00 <span>Stock: ${quantity}</span></h3>
                            <a class="blanco mode" id="${id}">${name} | <span>${category}</span></a>
                    </div> 
                    
                </div>                 
                `;
            }
            
            
        }

    }else{
        for (const {category,id,image,name,price,quantity } of stocktaking) {
      
            if(quantity>0){
                html+=`
            <div class="container_producto">
                <div class="producto">
                    <img src="${image}" alt="${name}">       
                </div>
                <div class="descripcion">
                        <h3>$${price}.00 <span>Stock: ${quantity}</span></h3>
                        <a class="mode"  id="${id}">${name} | <span>${category}</span></a>
                        <i class='bx bx-plus' id="${id}"></i>
                </div> 
                
            </div>                 
            `;
            }
            
            if(quantity===0){
                html+=`
                <div class="container_producto">
                    <div class="producto">
                        <img src="${image}" alt="${name}">  
                        <p class="agotado">Producto agotado</p>    
                        </img>
                    </div>
                    <div class="descripcion">
                            <h3>$${price}.00 <span>Stock: ${quantity}</span></h3>
                            <a class="mode"  id="${id}">${name} | <span>${category}</span></a>
                    </div> 
                    
                </div>                 
                `;
            }   
        }
    }  
    
    const stockproducts=document.querySelector(".productos")
    stockproducts.innerHTML=html;
}

// La función filtrado crea un arreglo de productos en stocktakin de acuerdo a la categoría filtrarname 
function filtrado(stocktaking,filtrarname){

    let arrayfiltro=[];

    if(filtrarname==='all'){
        for (const produc of Object.values(stocktaking)) {
            arrayfiltro.push(produc)
        }

    }
    else{
        for (const produc of Object.values(stocktaking)) {
            if(produc.category===filtrarname){
                arrayfiltro.push(produc)
            }
        }
    }

    return arrayfiltro

}

function estadof(){
    const shirt=document.querySelector(".filtro .shirt");
    const hoddie=document.querySelector(".filtro .hoddie");
    const all=document.querySelector(".filtro .all");
    const sweater=document.querySelector(".filtro .sweater");
    const estado=window.localStorage.getItem("estadofiltro")||"all";

    if(estado==="shirt"){
            shirt.classList.add("mixitup-control-active");
            hoddie.classList.remove("mixitup-control-active");
            all.classList.remove("mixitup-control-active");
            sweater.classList.remove("mixitup-control-active");
    }
    if(estado==="hoddie"){
        shirt.classList.remove("mixitup-control-active");
        hoddie.classList.add("mixitup-control-active");
        all.classList.remove("mixitup-control-active");
        sweater.classList.remove("mixitup-control-active");
    }
    if(estado==="sweater"){
        shirt.classList.remove("mixitup-control-active");
        hoddie.classList.remove("mixitup-control-active");
        all.classList.remove("mixitup-control-active");
        sweater.classList.add("mixitup-control-active");
    }
    if(estado==="all"){
        shirt.classList.remove("mixitup-control-active");
        hoddie.classList.remove("mixitup-control-active");
        all.classList.add("mixitup-control-active");
        sweater.classList.remove("mixitup-control-active"); 
        
    }

}

// realiza el filtrado de productos en la pantalla principal
function menuFiltro(stocktaking){ 
  
    

    document.querySelector(".filtro").addEventListener('click',function(e){

        if(e.target.classList.contains("shirt")){

            const produsctos=filtrado(stocktaking,'shirt');
            mostrarProductos(produsctos);
            window.localStorage.setItem("Producfiltro",JSON.stringify(produsctos));
            window.localStorage.setItem("estadofiltro","shirt");
          
        }

        if(e.target.classList.contains("all")){
            const produsctos=filtrado(stocktaking,'all');
            mostrarProductos(produsctos);
            window.localStorage.setItem("Producfiltro",JSON.stringify(produsctos));
            window.localStorage.setItem("estadofiltro","all");
           
          
        }

        if(e.target.classList.contains("hoddie")){
            const produsctos=filtrado(stocktaking,'hoddie');
            mostrarProductos(produsctos);
            window.localStorage.setItem("Producfiltro",JSON.stringify(produsctos));
            window.localStorage.setItem("estadofiltro","hoddie");
          
        }

        if(e.target.classList.contains("sweater")){
            const produsctos=filtrado(stocktaking,'sweater');
            mostrarProductos(produsctos);
            window.localStorage.setItem("Producfiltro",JSON.stringify(produsctos));
            window.localStorage.setItem("estadofiltro","sweater");
           
        }

        estadof()

    });

}

// para mostrar el carrito de compras
function carro(){
    const comprar=document.querySelector(".bx-cart")
    const comprar1=document.querySelector(".canti")
    const comprar2=document.querySelector(".menuu .bx-cart")
    const comprar3=document.querySelector(".menuu .canti")
    const cerarHtml=document.querySelector(".cerrar")
    const main_comprar=document.querySelector(".cart-com")
   
    comprar.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    comprar1.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    comprar2.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    comprar3.addEventListener('click',function(){
        main_comprar.classList.toggle("mostrar")
    })
    cerarHtml.addEventListener('click',function(){
        main_comprar.classList.remove("mostrar")
    });
}

// Para pintar los productos y el total a pagar en el carrito
function pinatrCart(cart){
    const cart_comHtml= document.querySelector(".producSelec");
    const compra_comHtml= document.querySelector(".comparProduc .producs");
    const comprar1=document.querySelector(".canti")
    const comprar2=document.querySelector(".menuu .canti")
    let can_produc=0;
    let totalpagar=0;
    
    // calcula la cantidad de productos y el total a pagar de los productos en el carrito
    for (const {cantidadProd,price} of Object.values(cart)) {
        can_produc+=cantidadProd;
        totalpagar+=cantidadProd*price
    }
    let html=``;
    let html1=``;

    // para pintar productos en el carrito
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
 
    // pinta cantidad de productos y total a pagar en el carrito
    if(can_produc===1){
        html1=`<p class="ff pdark"> ${can_produc} producto <span>$${totalpagar}.00</span></p>`;  
    }
    if(can_produc!==1){
        html1=`<p class="ff pdark"> ${can_produc} productos <span>$${totalpagar}.00</span></p>`;        
    }

    // pinta la cantidad de productos en el carrito en el header
    comprar1.textContent=can_produc;
    comprar2.textContent=can_produc;    
    cart_comHtml.innerHTML=html;
    compra_comHtml.innerHTML=html1;
}


function alCarroPrincipal(cart,stocktaking){
    const productHtml= document.querySelector(".productos");
    const actionsHtml= document.querySelector(".producSelec");
    const comprarHtml= document.querySelector(".compra");
    const ventanamodalhtml=document.querySelector(".modal");
  
    // manejo de ventana modal
    ventanamodalhtml.addEventListener('click',function(e){

        // agregar productos desde la modal
        if(e.target.classList.contains("plus-modal")){
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
            pinatrCart(cart)  
        }

        // cerrar ventana modal
        if(e.target.classList.contains("cerrar")){
            ventanamodalhtml.classList.toggle("mostrarmodal");
        }

    });

    // interactual con la ventana principal de productos
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
            pinatrCart(cart)  
        }

        // para abrir ventana modal de producto
        if(e.target.classList.contains("mode")){
            id=Number(e.target.id) 
            const producto=stocktaking.find(element => element.id ===id);
            modal(id,producto)
        }   
       
    });

    // interactuar desde los productos del carrito
    actionsHtml.addEventListener('click',function(e){

        // disminuir cantidad
        if(e.target.classList.contains("bx-minus")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
            if(productClic.cantidadProd===1){
                if(confirm("Desea eliminar el producto del carrito")){
                    delete cart[productClic.id]; 
                } 
            }else{
                cart[productClic.id].cantidadProd--;
            }
        }

        // aumentar cantidad
        if(e.target.classList.contains("bx-plus")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
            if(productClic.cantidadProd===productClic.quantity){
                confirm("No tenemos mas de estos en el stock")
            }else{
                cart[productClic.id].cantidadProd++;
            }
        }

        // Eliminar producto
        if(e.target.classList.contains("bx-trash")){
            const id=Number(e.target.classList[2]);
            const productClic=Object.values(cart).find(element => element.id ===id);
            if(confirm("Desea eliminar el producto del carrito")){
                delete cart[productClic.id]; 
            } 
        }

        window.localStorage.setItem("Prodselect",JSON.stringify(cart));
        pinatrCart(cart);   
    });

    // Comprar
    comprarHtml.addEventListener('click',function(){

        for (const produc of Object.values(cart)) {

            const id=produc.id;

            if(stocktaking[produc.id-1].id===produc.id){
                stocktaking[produc.id-1].quantity=stocktaking[produc.id-1].quantity-produc.cantidadProd  
            }

            window.localStorage.setItem("products",JSON.stringify(stocktaking));
        }
        cart={};
        window.localStorage.setItem("Prodselect",JSON.stringify(cart));
       
        pinatrCart(cart);

        const estado=window.localStorage.getItem("estadofiltro")||"all";
        productos=filtrado(stocktaking,estado)
        mostrarProductos(productos);        
    });
    
}


function animanavbar(){
    const dia=document.querySelector(".bx-sun");
    const anima= document.querySelector("header");
    const productosHtml= document.querySelector(".containerProdusctos");
    const menuproducHtml= document.querySelector("#a2");
    const homecHtml= document.querySelector("#a1");
    const menuproducHtml1= document.querySelector(".menuu .ble1");
    const homecHtml1= document.querySelector(".menuu .bla1");
    const menu= document.querySelector(".menuu");

    document.addEventListener('click',function(e){
        if(e.target.classList.contains("bx-menu")){
            menu.classList.add("mostrarmenu");
        }
    });
    menu.addEventListener('click',function(e){
        if(e.target.classList.contains("cerrarmenu")){
            menu.classList.remove("mostrarmenu");
        }
        if(e.target.classList.contains("bla1")){
            menu.classList.remove("mostrarmenu");
        };
        if(e.target.classList.contains("ble1")){
            menu.classList.remove("mostrarmenu");
        };
    });

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

    document.addEventListener('scroll',function(){
       const posicionproduc=productosHtml.getBoundingClientRect().top-75;
       if(posicionproduc<0){
        menuproducHtml.classList.add("rojo");
        homecHtml.classList.remove("rojo");
        menuproducHtml1.classList.add("rojo");
        homecHtml1.classList.remove("rojo");

       }else{
        menuproducHtml.classList.remove("rojo");
        homecHtml.classList.add("rojo");
        menuproducHtml1.classList.remove("rojo");
        homecHtml1.classList.add("rojo");

       }
    });

    

   

    
}

function darkmode(stocktaking){
    const dia=document.querySelector(".bx-sun");
    const clase_noche=document.querySelector(".bx-moon");
    
    //noche 
    clase_noche.addEventListener('click',function(){
        clase_noche.classList.toggle("darkmodeoff");
        dia.classList.toggle("darkmodeoff");
        window.localStorage.setItem("noche",JSON.stringify(clase_noche.classList));
        dark ()
        let produc=JSON.parse(window.localStorage.getItem("Producfiltro"))||stocktaking;
        mostrarProductos(produc);
        animanavbar()
    });
    // dia
    dia.addEventListener('click',function(){
        clase_noche.classList.toggle("darkmodeoff");
        dia.classList.toggle("darkmodeoff");
        window.localStorage.setItem("noche",JSON.stringify(clase_noche.classList));
        dark ()
        let produc=JSON.parse(window.localStorage.getItem("Producfiltro"))||stocktaking;
        mostrarProductos(produc);
        animanavbar()
    });
    
}


function dark (){
    let noche= JSON.parse(window.localStorage.getItem("noche"))||{};
    const bodyHtml=document.querySelector("body");
    const newcolecHtml=document.querySelector(".imgnewcolec");
    const carcomHtml= document.querySelector(".cart-com");
    const cerrarhtml= document.querySelector(".cerrar");
    const anima= document.querySelector("header");
    const ancor=document.querySelector("#a");
    const ancor1=document.querySelector("#a1");
    const ancor2=document.querySelector("#a2");
    const filtrHtml= document.querySelector(".filtro .shirt");
    const filtrHtml1= document.querySelector(".filtro .all");
    const filtrHtml2= document.querySelector(".filtro .hoddie");
    const filtrHtml3= document.querySelector(".filtro .sweater");
    const footerHtml= document.querySelector("footer");  
    const menuHtml= document.querySelector(".menuu");  
    const menuHtml1= document.querySelector(".bla a");
    const menuHtml2= document.querySelector(".ble a");
    
    if(Object.values(noche).includes("darkmodeoff")){
        bodyHtml.classList.add("bodydark");
        newcolecHtml.classList.add("imagenewcolecdark");
        carcomHtml.classList.add("cart-comdark");
        cerrarhtml.classList.add("cerrardark");
        footerHtml.classList.add("footerdark");
        anima.classList.remove("anima-headr")
        anima.classList.add("anima-headrdark")
        ancor.classList.add("navdark")
        ancor1.classList.add("navdark")
        ancor2.classList.add("navdark")
        filtrHtml.classList.add("navdark")
        filtrHtml2.classList.add("navdark")
        filtrHtml1.classList.add("navdark")
        filtrHtml3.classList.add("navdark")
        menuHtml.classList.add("menuudar")
        menuHtml1.classList.add("blanco")
        menuHtml2.classList.add("blanco")
       
    }else{
        bodyHtml.classList.remove("bodydark");
        newcolecHtml.classList.remove("imagenewcolecdark");
        carcomHtml.classList.remove("cart-comdark");
        cerrarhtml.classList.remove("cerrardark");
        footerHtml.classList.remove("footerdark");
        anima.classList.add("anima-headr")
        anima.classList.remove("anima-headrdark")
        ancor.classList.remove("navdark")
        ancor1.classList.remove("navdark")
        ancor2.classList.remove("navdark")
        filtrHtml.classList.remove("navdark")
        filtrHtml2.classList.remove("navdark")
        filtrHtml1.classList.remove("navdark")
        filtrHtml3.classList.remove("navdark")
        menuHtml.classList.remove("menuudar")
        menuHtml1.classList.remove("blanco")
        menuHtml2.classList.remove("blanco")
    }
}

function modal(id,producto){
    let noche= JSON.parse(window.localStorage.getItem("noche"))||{};
    const ventanamodalhtml=document.querySelector(".modal");
    let html=``;    
    // noche
             if(Object.values(noche).includes("darkmodeoff")){
                console.log("noche");
                if(producto.quantity>0){
                    html=`<div class="contmodal contmodaldark">
                                <div class="momal-img">
                                    <i class='bx bx-x cerrar cerrardark'></i>
                                    <img src=${producto.image} alt=""></img>
                                </div>
    
                                <div class="modal-info">
                                    <h3>${producto.name}</h3>
                                    <h4>${producto.description}</h4>
                                <div>
                                    <p><b>$${producto.price}.00<i class='bx bx-plus plus-modal' id=${id}></i></b></p>
                                    <h4>stock: ${producto.quantity}</h4>
                                </div>  
                        </div>
                        </div>`
                }
                else{
                    html=`<div class="contmodal contmodaldark">
                                <div class="momal-img">
                                    <i class='bx bx-x cerrar cerrardark'></i>
                                    <img src=${producto.image} alt=""><div class="agotado">Producto agotado</div></img>
                                    
                                </div>
    
                                <div class="modal-info">
                                    <h3>${producto.name}</h3>
                                    <h4>${producto.description}</h4>
                                <div>
                                    <p><b>$${producto.price}.00</b></p>
                                    <h4>stock: ${producto.quantity}</h4>
                                </div>  
                                
                        </div>
                        </div>`
                }              
            }
            else{
                console.log("dia");
                if(producto.quantity>0){
                    html=`<div class="contmodal">
                    <div class="momal-img">
                        <i class='bx bx-x cerrar'></i>
                        <img src=${producto.image} alt=""></img>
                    </div>
    
                    <div class="modal-info">
                        <h3>${producto.name}</h3>
                        <h4>${producto.description}</h4>
                        <div>
                            <p><b>$${producto.price}.00<i class='bx bx-plus plus-modal' id=${id}></i></b></p>
                            <h4>stock: ${producto.quantity}</h4>
                        </div>  
                    </div>
                    </div>`

                }else{
                    html=`<div class="contmodal">
                        <div class="momal-img">
                            <i class='bx bx-x cerrar'></i>
                            <img src=${producto.image} alt=""><div class="agotado">Producto agotado</div></img>
                        </div>
        
                        <div class="modal-info">
                            <h3>${producto.name}</h3>
                            <h4>${producto.description}</h4>
                            <div>
                                <p><b>$${producto.price}.00</b></p>
                                <h4>stock: ${producto.quantity}</h4>
                            </div>  
                        </div>
                    </div>`   
                }
                
            }  

    
            ventanamodalhtml.innerHTML=html; 
            ventanamodalhtml.classList.toggle("mostrarmodal");    
      
}
function load(){
    window.addEventListener("load",function(){
        setTimeout(function(){
            document
                    .querySelector(".load")
                    .classList.add("cierraload")
        },2000);
    });
}
async function main (){
    let stocktaking=JSON.parse(window.localStorage.getItem("products"))||await getcharaters(url);
    let cart=JSON.parse(window.localStorage.getItem("Prodselect"))||{};
    let noche= JSON.parse(window.localStorage.getItem("noche"))||{};
    const estado=window.localStorage.getItem("estadofiltro")||"all";
    const diamode=document.querySelector(".bx-sun");
    const clase_noche=document.querySelector(".bx-moon");
    if(Object.values(noche).includes("darkmodeoff")){
        diamode.classList.toggle("darkmodeoff");  
    }else{
        clase_noche.classList.toggle("darkmodeoff");
    }
    let producamostrar=filtrado (stocktaking, estado);
    console.log(producamostrar);

    estadof()
    load()
    animanavbar()
    menuFiltro(stocktaking)
    darkmode(stocktaking)
    dark ()
    mostrarProductos(producamostrar)
    carro()
    alCarroPrincipal(cart,stocktaking,noche);
    pinatrCart(cart)
    
   
}

main();