// This is an array containing all the types of pokemon.
const searchbar_types_list = [
	'normal',
	'fighting',
	'flying',
	'poison',
	'ground',
	'rock',
	'bug',
    'ghost',
    'steel',
	'fire',
	'water',
	'grass',
	'electric',
	'psychic',
    'ice',
	'dragon',
    'dark',
	'fairy',
    'unknown',
    'shadow'
];

// This is an array containing the colors to represent the types of pokemon in the corresponding array above.
const searchbar_colors_list = [
	'#F5F5F5',
	'#E6E0D4',
	'#F5F5F5',
	'#D9D2E9',
	'#f4e7da',
	'#d5d5d4',
	'#f8d5a3',
    '#d5a6bd',
    '#e7e7e7',
	'#faafaf',
	'#DEF3FD',
	'#DEFDE0',
	'#FCF7DE',
	'#eaeda1',
    '#e0eefb',
	'#97b3e6',
    '#76a5af',
	'#fceaff',
    '#5b5b5b',
    '#ea9999'
];

// Querying the document selectors for later use.
let body = document.querySelector("main");
let submit = document.querySelector("input[type=submit]");

// The onclick function for the submit button.  It prevents the default behavior of the input type.  Then it
// queries all elements with class "search_window" to remove and clear out the page.  It then grabs the user input
// and calls the fetch pokemon function with that as parameter.  It should then clear out the text field to an empty
// string but this doesn't seem to work for some reason.
submit.onclick = (event) => {
    event.preventDefault();
    document.querySelectorAll(".search_window").forEach(x => x.remove());
    let input = document.querySelector("input[type=text]").value;
    fetchPokemon(input);
    input.value = ""
}

// This is teh fetch pokemon function that takes a pokemon name inputted by the user.  It adds that name to the url
// and calls the fetch api with async and await.  Inside the try/catch block, it will call the displaySuccess
// function is the fetch is good and call the displayFailure function is the fetch is bad.
let fetchPokemon = (pokemon_name) => {
    let pokeapi = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    let fetchData = async (pokeapi) => {
        try {
            let response = await fetch(pokeapi);
            let pokemon = await response.json();
            displaySuccess(pokemon);
        } catch(error) {
            console.error(error);
            displayFailure(error);
        }
    }
    fetchData(pokeapi);
}

// This is the function to display the search modal upon successive fetch call.  It is a bit long because I didn't 
// split it into smaller functions like I did for the pokedex.  Therefore, I will comment inside the function below.
let displaySuccess = (pokemon) => {
    // First, we create a container div with class name "search_window".  This will be used to position the pop up
    // search correctly on the screen.  Then, we create a container div with class name "search_modal" to hold all 
    // pokemon information.  Next, we create a span element to contain the close button for the search modal and give
    // it the proper class name for styling.  The innerHTML is an X for simplicity, and it removes the search window
    // on click.  This button gets added to the search modal.  We remove the background property in case one is set.
    let search_window = document.createElement("div");
    search_window.setAttribute("class", "search_window");

    let search_modal = document.createElement("div");
    search_modal.setAttribute("class", "search_modal");

    let close_search = document.createElement("span");
    close_search.setAttribute("class", "close_search");
    close_search.innerHTML = "&times;";
    close_search.onclick = () => {
        search_window.remove();
    }
    search_modal.append(close_search);
    search_modal.style.removeProperty("background");

    // In this section, we first create the name element and the types element to hold the heading and the types.
    // We destructure the pokemon json for the types and use the indexOf function in conjunction with the constant
    // type and colors arrays above to color the background according to the number of types the pokemon possesses.
    // We capitalize the name and update the content of the created elements.  Then we add to the search modal.
    let name = document.createElement("h3");
    let types_heading = document.createElement("h5");
    let pokemon_type1 = document.createElement("h5");
    let pokemon_type2 = document.createElement("h5");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let type2_name;
    let index1 = searchbar_types_list.indexOf(`${type1_name}`);
    if (type2) {
        let {type: {name: type2_name_}} = type2;
        let index2 = searchbar_types_list.indexOf(`${type2_name_}`);
        search_modal.style.background = `linear-gradient(to right, ${searchbar_colors_list[index1]}, ${searchbar_colors_list[index2]})`;
        console.log(type1_name, type2_name_);
        if (type2_name_) type2_name = type2_name_;
    } else {
        search_modal.style.backgroundColor = searchbar_colors_list[index1];
    }

    let pokemon_name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    name.textContent = pokemon_name;
    types_heading.textContent = "TYPES";
    types_heading.style.textDecoration = "underline";
    pokemon_type1.textContent = type1_name;
    pokemon_type2.textContent = type2_name;
    
    search_modal.append(name);
    search_modal.append(types_heading);
    search_modal.append(pokemon_type1);
    search_modal.append(pokemon_type2);

    // This section creates a card for the images and the associated elements to be used.  We set the image attributes
    // for all 4 images and append to the card then added to the search modal.
    let card1 = document.createElement("div");
    let image1 = document.createElement("img");
    let image2 = document.createElement("img");
    let image3 = document.createElement("img");
    let image4 = document.createElement("img");

    image1.setAttribute("class", "pokemon-modal-image");
    image1.setAttribute("src", pokemon.sprites.front_default);
    image1.setAttribute("alt", `image of ${pokemon.name}`);
    image2.setAttribute("class", "pokemon-modal-image");
    image2.setAttribute("src", pokemon.sprites.back_default);
    image2.setAttribute("alt", `image of ${pokemon.name}`);
    image3.setAttribute("class", "pokemon-modal-image");
    image3.setAttribute("src", pokemon.sprites.front_shiny);
    image3.setAttribute("alt", `image of ${pokemon.name}`);
    image4.setAttribute("class", "pokemon-modal-image");
    image4.setAttribute("src", pokemon.sprites.back_shiny);
    image4.setAttribute("alt", `image of ${pokemon.name}`);
    card1.append(image1);
    card1.append(image2);
    card1.append(image3);
    card1.append(image4);
    card1.setAttribute("class", "pokemon-modal");
    search_modal.append(card1);

    // The following section destructures the stats of the pokemon and further destructure the array contents.  A
    // div is created to contain the canvas which is created to contain the chart.  The radar chart depicts the 
    // stats of the pokemon.  This is then added to the search modal.
    let {stats} = pokemon;
    let [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

    let card = document.createElement("div");
    let canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    canvas.style.padding = "20px";
    
    new Chart(canvas, {
        type: 'radar',
        options: {
            scale: {
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            },
        },
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{
                label: `Base Stats for ${pokemon_name}`,
                data: [hp.base_stat, attack.base_stat, defense.base_stat, specialAttack.base_stat, specialDefense.base_stat, speed.base_stat],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
    })
    
    card.append(canvas);
    search_modal.append(card);

    // The search modal gets added to the search window which in turn gets added to the body of the html page.
    search_window.append(search_modal);
    body.append(search_window);
}

// This is the function to be displayed when the user misspells the name of a pokemon or searches for a pokemon
// that doesn't exist.  Similar to the display success beginning actions, the function must first create the search
// window div container and name it with the appropriate class name.  It creates the search modal div container for
// the info elements inside.  It also creates the close search button with the appropriate class name, inner content,
// and on click function to remove the window.  It will the add the error message to the search modal and append all
// of that to the search windown and then add that to the body of the page.
let displayFailure = (error) => {
    let search_window = document.createElement("div");
    search_window.setAttribute("class", "search_window");

    let search_modal = document.createElement("div");
    search_modal.setAttribute("class", "search_modal");

    let close_search = document.createElement("span");
    close_search.setAttribute("class", "close_search");
    close_search.innerHTML = "&times;";
    close_search.onclick = () => {
        search_window.remove();
    }
    search_modal.append(close_search);

    let message = document.createElement("h3");
    message.innerHTML = "Error when searching for pokemon.<br>Please check your input for correctness.";
    search_modal.append(message);
    
    search_window.append(search_modal)
    body.append(search_window);
}

