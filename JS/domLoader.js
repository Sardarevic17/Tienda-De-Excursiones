//------CREAR LOS PRODUCTOS-------
class Producto {
  constructor(id, nombre, precio, imagen) {
    this.id = parseInt(id);
    this.nombre = nombre.toLowerCase();
    this.precio = parseFloat(precio);
    this.imagen = imagen.toLowerCase();
  }
}
let productos = [];

const Cabalgata = new Producto(1, "Cabalgata", 30, "img/cabalgata.jpg");
const Tirolesa = new Producto(2, "Tirolesa", 49, "img/Tirolesa.jpg");
const Rafting = new Producto(3, "Rafting", 60, "img/Rafting.jpg");
const Buceo = new Producto(4, "Buceo", 40, "img/Buceo.jpg");
const Parapente = new Producto(5, "Parapente", 150, "img/Parapente.jpg");
const MountanBike = new Producto(6, "M. Bike", 20, "img/Bike.jpg");
const Standup = new Producto(7, "S. up Padle", 40, "img/Padle.jpg");
const Treking = new Producto(8, "Treking", 25, "img/Treking.jpg");
const Kayak = new Producto(9, "Kayak", 20, "img/kayak.jpg");
const KiteSurf = new Producto(10, "KiteSurf", 45, "img/kite.jpg");
const Navegacion = new Producto(11, "Navegacion", 100, "img/Navegacion.jpg");
const Pesca = new Producto(12, "Pesca D.", 50, "img/Pesca.jpg");

productos.push(
  Cabalgata,
  Tirolesa,
  Rafting,
  Buceo,
  Parapente,
  MountanBike,
  Standup,
  Treking,
  Kayak,
  KiteSurf,
  Navegacion,
  Pesca
);

//----INSERTAR LOS PRODUCTOS EN EL HTML-----

for (const producto of productos) {
  $("#productos").append(`
    <div class="col-lg-2">
      <div class="item shadow mb-4">
        <h3 class="item-title">${producto.nombre}</h3>
        <img class="item-image" src="${producto.imagen}">
        <div class="item-details">
          <span>USD <h4 class="precio">${producto.precio}</h4></span>
          <a href="#" class="item-button btn btn-sm btn-dark agregar-carrito " itemid="${producto.id}">AÑADIR AL CARRITO</a>   
        </div>
      </div>
    </div>`);
}
