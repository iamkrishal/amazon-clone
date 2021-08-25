function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });
      });
      if (items) {
        document.querySelector(".main-sidebar").style.height = "auto";
      }
      generateItems(items);
    });
}

function addToCart(item) {
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        make: item.make,
        name: item.name,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-5", "mt-7");
    doc.innerHTML = `
            <div class="product-image w-44 h-44 bg-white"> 
                <img class="w-full h-full object-contain p-4"
                src="${item.image}" alt="">
            </div>
            <div class="product-name mt-2 text-sm font-bold text-gray-700">
                ${item.name}
            </div>
            <div class="product-make mt-1 text-sm text-gray-400">
                ${item.make}
            </div>
            <div class="product-rating mt-1 text-sm font-bold text-gray-700">⭐⭐⭐⭐⭐</div>
            <div class="product-price mt-2 text-sm font-bold text-gray-700">$${item.price}.00</div>
        `;
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "add-to-cart",
      "w-full",
      "flex",
      "justify-center",
      "bg-yellow-500",
      "p-2",
      "text-white",
      "mt-4",
      "cursor-pointer"
    );
    addToCartEl.innerText = "Add to cart";
    addToCartEl.addEventListener("click", () => {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-product").appendChild(doc);
  });
}

getItems();
