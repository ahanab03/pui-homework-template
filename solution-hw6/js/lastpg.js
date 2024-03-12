// initialize an empty array to store cart items
let cartItems = [];

// define all glazing options
const glazingOptions = {
  "Keep original": 0.00,
  "Sugar milk": 0.00,
  "Vanilla milk": 0.50,
  "Double chocolate": 1.50
};

// define all pack size options
const packSizeOptions = {
  "1": 1,
  "3": 3,
  "6": 5,
  "12": 10
};

// save cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Cart saved to local storage:", cartItems);
}

// only perform actions once the page loads
window.addEventListener("load", function() {
  initializeCart();

  // add items to the dom
  cartItems.forEach(item => {
    appendCartItem(item);
  });

  updateTotalPrice();
  updateCartNotification();
});

// create and append cart items 
function appendCartItem(roll) {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartItem = document.createElement("div");

  cartItem.classList.add("picAndWriting");
  const leftCol = document.createElement("div");
  leftCol.classList.add("leftCol");

  // finds the correct image from roll type and adds image to the left column
  const img = document.createElement("img");
  img.classList.add("pic");
  img.src = `../assets/products/${roll.type.toLowerCase().replace(" ", "-")}-cinnamon-roll.jpg`;
  leftCol.appendChild(img);

  // add some whitespace between the image and the "remove" link
  leftCol.appendChild(document.createElement("p"));

  // create and append "Remove" link
  const removeLink = document.createElement("a");
  removeLink.classList.add("remove");
  removeLink.textContent = "Remove";
  removeLink.href = "#"; // Add a link reference to make it clickable
  removeLink.addEventListener("click", function(event) {
      removeCartItem(cartItem, roll);
  });
  leftCol.appendChild(removeLink);

  // add some whitespace between the image and the "remove" link
  leftCol.appendChild(document.createElement("p"));

  // create a container for descriptions
  const descriptions = document.createElement("div");
  descriptions.classList.add("descriptions"); // referred to css 

  // create a container for middle col
  const middleCol = document.createElement("div");
  middleCol.classList.add("middleCol"); 

  // created paragraph for roll name 
  const rollName = document.createElement("p");
  rollName.textContent = roll.type + " Cinnamon Roll"; 
  middleCol.appendChild(rollName); // put roll name in the middle 

  // created paragraph for glazing 
  const glazing = document.createElement("p");
  glazing.textContent = roll.glazing; 
  middleCol.appendChild(glazing); // put glazing para in middle 

  // repeated
  const packSize = document.createElement("p");
  packSize.textContent = "Pack Size: " + roll.size; 
  middleCol.appendChild(packSize); 

  // consolidated middle column 
  descriptions.appendChild(middleCol);

  // created last column for pricing 
  const lastCol = document.createElement("div");
  lastCol.classList.add("lastCol");

  // create a paragraph for price
  const price = document.createElement("p");
  price.classList.add("price");
  const totalPrice = (roll.basePrice + glazingOptions[roll.glazing]) * packSizeOptions[roll.size]; // Calculate total price based on base price, glazing, and pack size
  price.textContent = "$" + totalPrice.toFixed(2); // Set the price text content
  lastCol.appendChild(price); // Append the price paragraph to the last column
  
  // appended all columns together to match up with the css 
  cartItem.appendChild(leftCol); 
  cartItem.appendChild(descriptions);
  cartItem.appendChild(lastCol);

  // inserted cart item into the list of cart items
  cartItemsContainer.appendChild(cartItem); 
  
  updateTotalPrice();
  updateCartNotification();
}

// remove cart items 
function removeCartItem(cartItem, roll) {
  cartItem.remove();

  // find index of the roll
  const index = cartItems.findIndex(item => item.type === roll.type && item.glazing === roll.glazing && item.size === roll.size);
  if (index !== -1) {
    // remove only one of the selected items
    cartItems.splice(index, 1);
    saveCartToLocalStorage(); // save cart to local storage 
  }

  updateTotalPrice();
  updateCartNotification();
}

// retrieve cart from local storage
function initializeCart() {
  const storedCart = localStorage.getItem("cart");

  try {
    // validity check
    if (storedCart !== null && storedCart !== undefined) {
      // Attempt to parse the retrieved cart data
      cartItems = JSON.parse(storedCart);
    } else {
      // empty carty gets an empty array 
      cartItems = [];
    }
    //error check
  } catch (error) {
    // if error occurs, default to an as empty array
    cartItems = [];
  }

  console.log("Retrieved cart:", cartItems);
}

// update total price based on the items in the cart
function updateTotalPrice() {
  const totalPriceElement = document.getElementById("totalPrice");
  let totalPrice = 0;

  // sum all prices in the cart
  cartItems.forEach(item => {
    totalPrice += (item.basePrice + glazingOptions[item.glazing]) * packSizeOptions[item.size];
  });

  // update element 
  totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
}

// update the cart notification
function updateCartNotification() {
  const cartItemCountElement = document.getElementById("cartItemCount");
  cartItemCountElement.textContent = cartItems.length.toString();
}
