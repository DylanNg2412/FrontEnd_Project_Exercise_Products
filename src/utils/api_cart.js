export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productCart = cart.find((c) => c._id === product._id);
  if (productCart) {
    productCart.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function removeItemFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const updatedCart = cart.filter((p) => p._id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
