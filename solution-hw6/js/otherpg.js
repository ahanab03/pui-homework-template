// global variables
let basePrice = 0;
let origGlaze = 0.00;
let origPack = 1;

// referencing from the HTML
const glazingDropdown = document.getElementById("glazingOptions");
const packSizeDropdown = document.getElementById("packageOptions");
const totalPriceElement = document.getElementById("price");
const addToCartButton = document.querySelector(".cart");
const cartItemCountElement = document.getElementById("cartItemCount");

// glazing options
const glazingOptions = {
    "Keep original": 0.00,
    "Sugar milk": 0.00,
    "Vanilla milk": 0.50,
    "Double chocolate": 1.50
};

// pack size options
const packSizeOptions = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};

// populate dropdowns for packSizeOptions and glazingOptions
function populateDropdown(dropdown, choices) {
    for (let option in choices) {
        let currOption = document.createElement("option");
        currOption.value = option;
        currOption.textContent = option;
        dropdown.appendChild(currOption);
    }
}

// call functions
populateDropdown(glazingDropdown, glazingOptions);
populateDropdown(packSizeDropdown, packSizeOptions);

// event listener for glazing dropdown change
function glazingChange() {
    origGlaze = glazingOptions[glazingDropdown.value];
    calculateTotalPrice();
}

// event listener for pack size dropdown change
function packSizeChange() {
    origPack = packSizeOptions[packSizeDropdown.value];
    calculateTotalPrice();
}

// event listeners to dropdowns
glazingDropdown.addEventListener("change", glazingChange);
packSizeDropdown.addEventListener("change", packSizeChange);

// function to calculate total price
function calculateTotalPrice() {
    totalPriceElement.textContent = "$" + ((basePrice + origGlaze) * origPack).toFixed(2);
}

// find current roll information
const queryRoll = new URLSearchParams(window.location.search);
const rollType = queryRoll.get('roll');
const rollInfo = rolls[rollType];

// update DOM based on retrieved roll information
if (rollInfo) {
    document.getElementById("intro").textContent = `${rollType} Cinnamon Roll`;
    basePrice = rollInfo.basePrice;
    document.getElementById("price").textContent = `$${basePrice.toFixed(2)}`;
    document.querySelector(".origpic").src = `../assets/products/${rollInfo.imageFile}`;
} else {
    console.error("Roll information not found.");
}

// roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// function to add roll to cart
function addToCart(roll, cart) {
    if (roll instanceof Roll) {
        cart.push(roll);
        saveCartToLocalStorage(cart);
        updateCartNotification(cart);
        console.log("Current contents of cart in local storage after saving:", JSON.parse(localStorage.getItem("cart")));
    } 
}

// save cart to local storage
function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// retrieve cart from local storage
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// initialize cart
let cart = getCartFromLocalStorage();


// "add to cart" button event listener
addToCartButton.addEventListener("click", function() {
    const rollType = queryRoll.get('roll');
    const rollInfo = rolls[rollType];
    if (rollInfo) {
        const selectedGlazing = glazingDropdown.value;
        const selectedPackSize = packSizeDropdown.value;
        const roll = new Roll(rollType, selectedGlazing, selectedPackSize, rollInfo.basePrice);
        addToCart(roll, cart);
    }
});

// update cart notification
function updateCartNotification(cart) {
    cartItemCountElement.textContent = cart.length.toString();
}

// call function
updateCartNotification(cart);
