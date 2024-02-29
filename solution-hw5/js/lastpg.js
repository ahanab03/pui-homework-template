// all glazing options and associated prices
const glazingOptions = {
  "Keep original": 0.00,
  "Sugar milk": 0.00,
  "Vanilla milk": 0.50,
  "Double chocolate": 1.50
};

// all pick size options and associated prices
const packSizeOptions = {
  "1": 1,
  "3": 3,
  "6": 5,
  "12": 10
};

// all types of cinnamon rolls and associated base prices
const basePrices = {
  "Original": 2.49,
  "Walnut": 3.49,
  "Raisin": 2.99,
  "Apple": 3.49   
};

// roll class creation
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing =  rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice; 
  }
    
    
  // to avoid hardcoding, this is the calculated price derived from base price
  calculatePrice() {
    const basePrice = this.basePrice;
    const glazePrice = glazingOptions[this.glazing];
    const packSize = packSizeOptions[this.size];
    return (basePrice + glazePrice) * packSize;
  }
}

// create and append cart items 
function appendCartItem(roll) {
  const cartItems = document.getElementById("cartItems");
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

  // created paragraph fror glazing 
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

  // repeated previous steps 
  const price = document.createElement("p");
  price.classList.add("price"); 
  price.textContent = "$" + roll.calculatePrice().toFixed(2); 
  lastCol.appendChild(price); 

  // appended all columns together to match up with the css 
  cartItem.appendChild(leftCol); 
  cartItem.appendChild(descriptions);
  cartItem.appendChild(lastCol);

  // inserted cart item into the list of cart items
  cartItems.insertBefore(cartItem, cartItems.childNodes[0]); 

  // updated total price
  updateTotalPrice();
  }
  
  // remove cart items 
  function removeCartItem(cartItem, roll) {
    cartItem.remove();
  
    // update total price once removed
    const priceText = cartItem.querySelector(".price").textContent;
    const removedPrice = parseFloat(priceText.substring(1)); //make it a number
    const totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = parseFloat(totalPriceElement.textContent.substring(1)); 
    //subtract roll price  
    totalPrice -= removedPrice;
    totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
  }
  
  // update total price function 
  function updateTotalPrice() {
    const totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = 0;
  
    // sum all the prices of cart 
    const cartItems = document.querySelectorAll(".picAndWriting");
    cartItems.forEach(item => {
      const priceText = item.querySelector(".price").textContent;
      totalPrice += parseFloat(priceText.substring(1)); // Remove "$" and parse as float
    });
  
    totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
  }
  
  // created 4 new rolls 
  const originalRoll = new Roll("Original", "Sugar milk", "1", basePrices["Original"]);
  const walnutRoll = new Roll("Walnut", "Vanilla milk", "12", basePrices["Walnut"]);
  const raisinRoll = new Roll("Raisin", "Sugar milk", "3", basePrices["Raisin"]);
  const appleRoll = new Roll("Apple", "Keep original", "3", basePrices["Apple"]);
  
  // appended cart items 
  appendCartItem(appleRoll);
  appendCartItem(raisinRoll);
  appendCartItem(walnutRoll);  
  appendCartItem(originalRoll);

  