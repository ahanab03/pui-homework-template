// global variables are defined
let basePrice = 2.49;
let origGlaze = 0.00;
let origPack = 1;

// reference the html dropdown elements and prices
const glazingDropdown = document.getElementById("glazingOptions");
const packSizeDropdown = document.getElementById("packageOptions");
const totalPriceElement = document.getElementById("price");

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
