class carritoDeCompras {
  //--CAPTURAR EL PRODUCTO---
  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
      const producto_capturado = e.target.parentElement.parentElement;
      this.leerDatosProducto(producto_capturado);
    }
  }
  //--LEER CARACTERISTICAS DEL PRODUCTO--
  leerDatosProducto(producto) {
    //objeto del producto seleccionado
    const infoProducto = {
      imgSrc: producto.querySelector("img").src,
      name: producto.querySelector("h3").textContent,
      price: producto.querySelector("h4").textContent,
      id: producto.querySelector("a").getAttribute("itemid"),
      cantidad: 1,
    };

    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((productoLS) => {
      if (productoLS.id === infoProducto.id) {
        productosLS = productoLS.id;
      }
    });
    if (productosLS === infoProducto.id) {
      alertify.alert("Carrito", "El producto ya fue agregado");
    } else {
      this.insertarCarrito(infoProducto);
      alertify.notify(
        `${infoProducto.titulo.toUpperCase()} añadidos/as`,
        "success",
        4
      );
    }
  }

  const renderProdcuts = async () =>{

    try{
      const response = await fetch("data.json");
      const productsLista = await response.json();

      productsLista.forEach((product) => {
      productsEl.innerHTML += `
                <div class="item">
                    <div class="item-container" data-aos="fade-up">
                        <div class="item-img">
                            <img src="${product.imgSrc}" alt="${product.name}">
                        </div>
                        <div class="desc">
                            <h2>${product.name}</h2>
                            <h2><small>$</small>${product.price}</h2>
                        </div>
                        <div class="add-to-cart" onclick="addToCart(${product.id})">
                            <img src="../img/cart.png" alt="add to cart">
                        </div>
                    </div>
                </div>
            `;
      });
    }catch (error){
      console.log(error)
    }
  }

  //Ejecuto mi funcion de renderizar los productos 
  renderProdcuts();


  //--PONER PRODUCTO EN EL CARRITO
  insertarCarrito(infoProducto) {
    $("#carrito").append(`
            <tr>
                <td><img src="${infoProducto.imgSrc}" style="width: 50px;"></td>
                <td>${infoProducto.name.toUpperCase()}</td>
                <td>${infoProducto.price}</td>
                <td><a href="#" class="borrar-producto btn btn-danger" itemid="${
                  infoProducto.id
                }">X</a> </td> 
            </tr>
        `);
    this.guardarProductosLocalStorage(infoProducto);
  }

  //--ELIMINAR ATRACCION DEL CARRITO (INDEX)
  eliminarProducto = (e) => {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("itemid");
      alertify.error(`${producto.children[1].textContent} eliminado`);
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();
  };

  vaciarCarrito = (e) => {
    e.preventDefault();
    while (carrito.firstChild) {
      carrito.removeChild(carrito.firstChild);
    }
    this.vaciarLocalStorage();
  };

  //--GUARDAR ATRACCION AGREGADO AL CARRITO

  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  obtenerProductosLocalStorage() {
    let productosLS;

    if (localStorage.getItem("productos") === null) {
      productosLS = [];
    } else {
      productosLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productosLS;
  }
  //--QUITAR ATRACCION MEDIANTE ID --
  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  //--PRINTEAR ELEMENTOS QUE ESTAN EN EL LOCALSTORAGE--
  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((infoProducto) => {
      $("#carrito").append(`
                <tr>
                    <td><img src="${
                      infoProducto.imgSrc
                    }" style="width: 50px;"></td>
                    <td>${infoProducto.titulo.toUpperCase()}</td>
                    <td>${infoProducto.price}</td>
                    <td><a href="#" class="borrar-producto btn btn-danger" itemid="${
                      infoProducto.id
                    }">X</a> </td> 
                </tr>
            `);
    });
  }

  vaciarLocalStorage() {
    localStorage.clear();
  }

  procesarPedido(e) {
    e.preventDefault();
    if (this.obtenerProductosLocalStorage().length === 0) {
      alertify.alert("Carrito", "No hay productos en el carrito");
    } else {
      location.href = "compra.html";
    }
  }
  //--AGREGAR ATRACCION A COMPRA.HTML POR LOCALSTORAGE
  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      let precioSinSigno = Number(producto.precio.replace("$", ""));
      $("#lista-procesada").append(`
                <tr>
                    <td>
                        <img src="${producto.imgSrc}" width = 100>
                    </td>
                    <td>${producto.titulo.toUpperCase()}</td>
                    <td>${precioSinSigno}</td>
                    <td>
                        <input type="number" class="form-control cantidad bg-dark text-white" min="1" value="${
                          producto.cantidad
                        }">
                    </td>
                    <td id="subtotales">${
                      precioSinSigno * producto.cantidad
                    } </td>
                    <td>
                        <a href="#" class="borrar-producto btn btn-danger" itemid="${
                          producto.id
                        }">X</a> 
                    </td> 
                </tr>
            `);
    });
  }

  calcularTotal() {
    let productoLS;
    let total = 0,
      subtotal = 0,
      impuestos = 0;

    productoLS = this.obtenerProductosLocalStorage();
    for (let i = 0; i < productoLS.length; i++) {
      let element = Number(productoLS[i].price * productoLS[i].cantidad);
      total = total + element;
    }
    impuestos = parseFloat(total * 0.21).toFixed(2);
    subtotal = parseFloat(total - impuestos).toFixed(2);

    $("#subtotal").html(subtotal);
    $("#imp").html(impuestos);
    $("#total").html(total.toFixed(2));
  }
  //AUMENTAR CANTIDAD DE LOS PRODUCTOS SELECCIONADOS
  obtenerEvento(e) {
    e.preventDefault();
    let id, cantidad, producto, productosLS;

    if (e.target.classList.contains("cantidad")) {
      producto = e.target.parentElement.parentElement;
      id = producto.querySelector("a").getAttribute("itemid");
      cantidad = producto.querySelector("input").value;
      let actualizarMontos = document.querySelectorAll("#subtotales");
      productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(function (productoLS, index) {
        if (productoLS.id === id) {
          productoLS.cantidad = cantidad;
          actualizarMontos[index].innerHTML = Number(
            cantidad * productosLS[index].price
          ).toFixed(2);
        }
      });
      localStorage.setItem("productos", JSON.stringify(productosLS));
    }
  }
}
