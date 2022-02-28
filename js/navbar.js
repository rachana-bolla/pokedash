// This is a function to handle the menu icon when user clicks the pokeball.  The menu items are displayed if hidden
// and disappears if shown.
let handleMenuIcon = () => {
    let items = document.querySelectorAll(".menu-container");
    items.forEach(item => {
        if (item.style.display === "block") {
            item.removeAttribute("style");
        } else {
            item.style.display = "block";
            item.style.zIndex = "9";
        }
    })
}

let displayMenu = () => {
    let items = document.querySelectorAll(".menu-container");
    items.forEach(item => {
		if (window.outerWidth >= 550 ){
        if (item.style.display === "none") {
            item.style.display = "block";
	    }
		}
		
		if (window.outerWidth <= 550 ){
        if (item.style.display === "block") {
            item.style.display = "none";
	    }
		}
   })
}


