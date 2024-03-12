// update cart notification
function updateCartNotification(cart) {
    //number of items in cart 
    const cartItemCount = cart.length; 
    const ovalElement = document.querySelector('.oval'); 
    //update text in oval
    ovalElement.textContent = cartItemCount.toString(); 
}

// find number of contents within the cart
function initializeCart() {
    const storedCart = localStorage.getItem("cart");
    // check if storedCart is not null or undefined
    if (storedCart !== null && storedCart !== undefined) {
        cart = JSON.parse(storedCart);
    } else {
        // when cart is empty 
        cart = [];
    }
    // update the cart notification when page loads
    updateCartNotification(cart);
}

// call function 
initializeCart();
