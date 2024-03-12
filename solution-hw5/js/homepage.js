// Define a module for managing roll links
const RollLinkModule = (() => {
    // Function to update roll links
    function updateRollLinks() {
      const rollLinks = document.querySelectorAll('.roll-link');
  
      // go through each roll link
      for (const link of rollLinks) {
        // get the roll associated with each link
        const rollType = link.dataset.roll;
  
        // get the roll information once knowing the type
        const rollData = rolls[rollType];
  
        // update the page link 
        if (rollData) {
            const detailPageURL = `otherpage.html?roll=${encodeURIComponent(rollType)}`;
            link.href = detailPageURL;
        }
      }
    }
  
    return {
      updateRollLinks
    };
  })();
  
  // Execute after DOM content has loaded
  document.addEventListener("DOMContentLoaded", () => {
    RollLinkModule.updateRollLinks();
  });
  