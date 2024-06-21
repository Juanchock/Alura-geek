const apiUrl = "https://fake-api-blush-tau.vercel.app/productos";

const productList = async () => {
  try {
    const res = await fetch(apiUrl);
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const createProducts = async (nombre, precio, imagen) => {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        precio,
        imagen,
      }),
    });
    location.reload();
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const servicesProducts = {
  productList,
  createProducts,
  deleteProduct,
};
