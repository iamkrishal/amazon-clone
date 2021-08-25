function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            });
        });
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    });
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    });
    document.querySelector(".total-cost-number").textContent = `$${totalCost}`;
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
            <div class="cart-item flex items-center pb-4 border-b border-gray-200 cursor-pointer hover:border-gray-300">   
                <div class="cart-item-image w-40 h-24 p-4">
                    <img class="w-full h-full object-contain"
                    src="${item.image}" alt="">
                </div>

                <div class="cart-item-details flex-grow">
                    <div class="cart-item-title font-bold text-sm text-gray-600">${item.name}</div>
                    <div class="cart-item-brand text-gray-400 text-sm font-bold">${item.make}</div>
                </div>

                <div class="cart-item-counter w-44 flex items-center">
                    <div data-id="${item.id}" class="chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6
                    flex items-center justify-center hover:bg-gray-200 mr-2">
                        <i class="fas fa-chevron-left"></i>
                    </div>

                    <h4 class="text-gray-400">x${item.quantity}</h4>
                    <div data-id="${item.id}" class="chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6
                        flex items-center justify-center hover:bg-gray-200 ml-2">
                        <i class="fas fa-chevron-right"></i>
                    </div>

                </div>

                <div class="cart-item-total-cost w-44 text-gray-400">
                    $${item.price * item.quantity}
                </div>

                <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `
    });

    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".chevron-left");
    let increaseButtons = document.querySelectorAll(".chevron-right");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click" , () => {
            decreaseCount(button.dataset.id);
        });
    });

    increaseButtons.forEach((button) => {
        button.addEventListener("click" , () => {
            increaseCount(button.dataset.id);
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click" , () => {
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();