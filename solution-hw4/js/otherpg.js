// global variables are defined
let basePrice = 0; // will be updated based on the roll type
let origGlaze = 0.00;
let origPack = 1;

// reference the html dropdown elements and prices
const glazingDropdown = document.getElementById("glazingOptions");
const packSizeDropdown = document.getElementById("packageOptions");
const totalPriceElement = document.getElementById("price");
const addToCartButton = document.querySelector(".cart");

// define all the glazing options
const glazingOptions = {
  "Keep original": 0.00,
  "Sugar milk": 0.00,
  "Vanilla milk": 0.50,
  "Double chocolate": 1.50
};

// define all the pack size options
const packSizeOptions = {
  "1": 1,
  "3": 3,
  "6": 5,
  "12": 10
};

// for loop to populate the dropdown with all available choices 
function populateDropdown(dropdown, choices) {
  for (let option in choices) {
    let currOption = document.createElement("option");
    currOption.value = option;
    currOption.textContent = option;
    dropdown.appendChild(currOption);
  }
}

// update the html file
populateDropdown(glazingDropdown, glazingOptions);
populateDropdown(packSizeDropdown, packSizeOptions);

// catches when the glazing drop down has changed
function glazingChange() {
  const selectedGlazing = glazingDropdown.value;
  const glazingPrice = glazingOptions[selectedGlazing];
  // sets the global variable to the local one to help calculate the total price
  origGlaze = glazingPrice;
  // calls price function to update it 
  price();
}

// repeated function for pack size changes
function packSizeChange() {
  const selectedPackSize = packSizeDropdown.value;
  const packSizePrice = packSizeOptions[selectedPackSize];
  origPack = packSizePrice;
  price();
}

// triggers the function when the user changes their dropdown input
glazingDropdown.addEventListener("change", glazingChange);
packSizeDropdown.addEventListener("change", packSizeChange);

// calculates the bottom total price
function price() {
  const totalPrice = (basePrice + origGlaze) * origPack;
  totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
}

// find the current roll's information 
const queryRoll = window.location.search; //looks at name of current roll
const findRoll = new URLSearchParams(queryRoll);
const rollType = findRoll.get('roll'); 
const rollInfo = rolls[rollType];

// updating DOM elements
if (rollInfo) {
    // product detail roll name title update
    const rollHeading = document.getElementById("intro");
    rollHeading.textContent = `${rollType} Cinnamon Roll`;

    // base price update
    basePrice = rollInfo.basePrice;

    // total price for each roll update
    document.getElementById("price").textContent = `$${basePrice.toFixed(2)}`;

    // image update
    document.querySelector(".origpic").src = `../assets/products/${rollInfo.imageFile}`;
}

// creating roll class 
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// global cart variable
const cart = [];

// add a roll to the cart
function addToCart() {
    // get the selected amounts from dropdowns
    const selectedGlazing = glazingDropdown.value;
    const selectedPackSize = packSizeDropdown.value;
    
    // match the dropdowns to the roll attributes 
    const roll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);
    
    // add roll to the cart 
    cart.push(roll);
    
    // print out roll in the console
    console.log(cart);
}

// responds to the add to cart click
addToCartButton.addEventListener("click", addToCart);
