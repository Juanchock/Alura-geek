import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-lista]");
const form = document.querySelector("[data-form]");

function createcard(nombre, precio, imagen, id) {
  const card = document.createElement("div");
  card.classList.add("product");
  card.innerHTML = `
    <img class=".remove-bg" src="${imagen}"alt="">
    <div class="product_info">
        <div class="description">
            <h3>${nombre}</h3>
            <h4>$ ${precio} COP</h4>
        </div>
        <img class="delete_button" src="assets/icon/delete_icon.svg" alt="">
    </div>
     `;

  const deleteButton = card.querySelector(".delete_button");
  deleteButton.addEventListener("click", () => {
    servicesProducts
      .deleteProduct(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.log(err));
  });

  productContainer.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach((productos) => {
      productContainer.appendChild(
        createcard(
          productos.nombre,
          productos.precio,
          productos.imagen,
          productos.id
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  servicesProducts
    .createProducts(name, price, image)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});

render();
