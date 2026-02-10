document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MENÚ LATERAL
  =============================== */
  const menuIcon = document.getElementById("menu-icon");
  const sideMenu = document.querySelector(".side-menu");
  const closeMenu = document.querySelector(".close-menu");

  if (menuIcon && sideMenu && closeMenu) {
    menuIcon.addEventListener("click", () => {
      sideMenu.classList.add("show");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("show");
    });
  }

  /* ===============================
     CARRITO (ABRIR / CERRAR)
  =============================== */
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const cartCloseBtn = document.querySelector(".cart__close");

/* ABRIR / CERRAR CON ÍCONO */
if (cartIcon && cart) {
  cartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    cart.classList.toggle("show");
  });
}

/* CERRAR CON BOTÓN ✕ */
if (cartCloseBtn && cart) {
  cartCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cart.classList.remove("show");
  });
}

/* CERRAR TOCANDO AFUERA (SOLO DESKTOP) */
document.addEventListener("click", (e) => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) return; 

  if (
    cart.classList.contains("show") &&
    !cart.contains(e.target) &&
    !cartIcon.contains(e.target)
  ) {
    cart.classList.remove("show");
  }
});


  /* ===============================
     REFERENCIAS CARRITO
  =============================== */
  const cartContainer = document.querySelector(".cart");
  const cartBadge = document.querySelector(".cart-badge");
  const addCartButtons = document.querySelectorAll(".add-cart");
  const buyButton = cartContainer.querySelector(".order-btn");

  /* ===============================
     CONTADOR
  =============================== */
  function updateCartBadge() {
    const items = cartContainer.querySelectorAll(".cart__item");
    cartBadge.textContent = items.length;
    cartBadge.style.display = items.length === 0 ? "none" : "flex";
  }

  updateCartBadge();

  /* ===============================
     AGREGAR PRODUCTOS
  =============================== */
  addCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".products__item");

      const imgSrc = product.querySelector(".products__image").src;
      const title = product.querySelector(".products__title").innerText;
      const price = product.querySelector(".products__price").innerText;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart__item");

      cartItem.innerHTML = `
        <img class="cart__image" src="${imgSrc}" alt="${title}">
        <p>${title}</p>
        <p class="cart__price">${price}</p>
        <i class="cart__remove">
          <img class="cart__remove-img" src="img/Icono-quitar.png" alt="Quitar">
        </i>
      `;

      cartContainer.insertBefore(cartItem, buyButton);
      updateCartBadge();

      cartItem.querySelector(".cart__remove").addEventListener("click", (e) => {
        e.stopPropagation();
        cartItem.remove();
        updateCartBadge();
      });
    });
  });

  /* ===============================
     BOTÓN ORDENAR (ANIMACIÓN)
  =============================== */
  const orderBtn = document.getElementById("orderBtn");

  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const items = cartContainer.querySelectorAll(".cart__item");
      if (items.length === 0) return;

      // bloquear botón
      orderBtn.disabled = true;
      orderBtn.classList.add("is-sending");

      // tiempo de animación del camión
      setTimeout(() => {
        orderBtn.classList.remove("is-sending");
        orderBtn.classList.add("is-done");

        // vaciar carrito
        items.forEach(item => item.remove());
        updateCartBadge();

        // resetear botón para volver a comprar
        setTimeout(() => {
          orderBtn.classList.remove("is-done");
          orderBtn.disabled = false;
        }, 3000);

      }, 3100); // debe coincidir con animación del camión
    });
  }

});
