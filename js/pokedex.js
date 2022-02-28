// This is an array containing all the types of pokemon.
const types_list = [
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
const colors_list = [
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

// This block of code queries different selectors on the pokedex page for later processing.  There are also
// variables created to limit the number of pokemons to fetch at one time.
let screen = document.querySelector(".pokedex-screen");
let modal_screen = document.querySelector(".modal-screen");
let close = document.querySelector(".close");
let back = document.getElementById("back");
let next = document.getElementById("next");
let start = 0;
let limit = 12;
let end = start + limit;

// This is the onclick function for the close button in the modal screen.  When clicked, the display will disappear.
close.onclick = () => {
    modal_screen.style.display = "none";
    screen.style.overflow = "auto";
}

// This is a function to add the pokemon name and type to the modal screen.  It takes a pokemon parameter from
// the api fetch with pokemon information.  It creates a card container div, a name element h3, and 3 h5 tags
// for the types.  The type section displays the title "TYPES" underlined and either 1 or 2 types depending on 
// the pokemon.  This card gets appended to the modal screen with the class name "pokemon-modal".
let modalName = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let types_heading = document.createElement("h5");
    let pokemon_type1 = document.createElement("h5");
    let pokemon_type2 = document.createElement("h5");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let type2_name;
    if (type2) {
        let {type: {name: type2_name_}} = type2;
        if (type2_name_) type2_name = type2_name_;
    }
    
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    types_heading.textContent = "TYPES";
    types_heading.style.textDecoration = "underline";
    pokemon_type1.textContent = type1_name;
    pokemon_type2.textContent = type2_name;
    card.append(name);
    card.append(types_heading);
    card.append(pokemon_type1);
    card.append(pokemon_type2);
    card.setAttribute("class", "pokemon-modal");
    modal_screen.append(card);
}

// This is a function of add pokemon images to the modal screen and takes the pokemon parameter gathered from an
// api call.  First, it creates two card container divs and 4 image elements.  Then, it sets the attributes for all
// images giving them class name of "pokemon-modal-image" in order to be styled and alt text.  It appends the regular
// front and back images to card 1 and appends the shiny front and back images to card 2 so that all images don't
// appear on the same line.  Both cards are classed as "pokemon-modal" and then appended to the modal screen.
let modalImages = (pokemon) => {
    let card1 = document.createElement("div");
    let card2 = document.createElement("div");
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
    card2.append(image3);
    card2.append(image4);
    card1.setAttribute("class", "pokemon-modal");
    card2.setAttribute("class", "pokemon-modal");
    modal_screen.append(card1);
    modal_screen.append(card2);
}

// This is the function to add a pokemon stat chart to the modal screen and takes the pokemon json document from 
// an api fetch call.  First, it capitalizes the pokemon name.  Then, it destructures the stats field from the 
// json document and further destructures the array containing all 6 stat properties.  It creates a card to contain
// information and a canvas with a transparent background to contain the chart.  A new radar chart is created 
// with scale from 0 to 100 stepping by 20.  Correct labels and stat data are added.  The card gets appended to the
// modal screen with class name "pokedex-modal".
let modalStats = (pokemon) => {
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
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
                label: `Base Stats for ${name}`,
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
    card.setAttribute("class", "pokemon-modal");
    modal_screen.append(card);
}

// This is a function to display all information in the modal screen.  It takes a pokemon parameter to process and
// pass to the functions that it will call.  The first thing it has to do is the query all the elements with class
// "pokemon-modal" so that it can remove it from the screen.  It also removes the background property of the modal
// in case a linear gradient was set previously.  This is important in order to display a solid color background if
// that is needed in the next display of the modal screen.  The center section of this function determines the new
// background for the modal depending on the pokemon it was given as a parameter.  Pokemons with 2 types will get
// a linear gradient background and 1 type will get a solid color background.  It calls the 3 functions to display 
// the name and types, the images, and the stat chart.  Lastly, it changes the display of the modal screen to block.
let displayInfoModal = (pokemon) => {
    document.querySelectorAll(".pokemon-modal").forEach(card => card.remove());
    modal_screen.style.removeProperty("background");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let index1 = types_list.indexOf(`${type1_name}`);
    if (type2) {
        let {type: {name: type2_name}} = type2;
        let index2 = types_list.indexOf(`${type2_name}`);
        modal_screen.style.background = `linear-gradient(${colors_list[index1]}, ${colors_list[index2]})`;
    } else {
        modal_screen.style.backgroundColor = colors_list[index1];
    }
    
    modalName(pokemon);
    modalImages(pokemon);
    modalStats(pokemon);

    modal_screen.style.display = "block";
}

// This is the function to add a single pokemon card to the pokedex screen.  It takes a pokemon fetched.  It creates
// a card container div, a name element h3, and an image element.  It checks for the types of the pokemon and uses
// the constants type array and color array above to color the background of the card.  It capitalizes the name and
// sets attributes to the image.  It appends the card to the screen with a give class name for styling.  An onclick
// event is added to call the display modal function above.
let addPokemonCard = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let image = document.createElement("img");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let index1 = types_list.indexOf(`${type1_name}`);
    if (type2) {
        let {type: {name: type2_name}} = type2;
        let index2 = types_list.indexOf(`${type2_name}`);
        card.style.background = `linear-gradient(${colors_list[index1]}, ${colors_list[index2]})`;
    } else {
        card.style.backgroundColor = colors_list[index1];
    }
    
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    image.setAttribute("class", "pokemon-image");
    image.setAttribute("src", pokemon.sprites.front_default);
    image.setAttribute("alt", `image of ${pokemon.name}`);
    card.append(name);
    card.append(image);
    screen.append(card);
    
    card.setAttribute("class", "pokemon-card");
    card.onclick = () => {
        displayInfoModal(pokemon);
    }
}

// This is the function to fetch pokemons.  It takes the start and end numbers of the id of pokemon to add to the 
// url to fetch.  The start and end parameters determine how many pokemons will be called.  However, it must first
// clear the screen by removing any existing pokemon card.  It uses a for loop to fetch pokemons from the PokeAPI.
let loadPage = (start, end) => {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    for (let id = start + 1; id <= end; id++) {
        let pokeapi = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let fetchData = async (pokeapi) => {
            try {
                let response = await fetch(pokeapi);
                let pokemon = await response.json();
                addPokemonCard(pokemon);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData(pokeapi);
    }
}

// Here we call the load function when the pokedex page is loaded.
loadPage(start, end);
// let card1 = document.createElement("div");
// let card2 = document.createElement("div");
// let card3 = document.createElement("div");
// let card4 = document.createElement("div");
// card1.style.backgroundColor = "black";
// card2.style.backgroundColor = "black";
// card3.style.backgroundColor = "black";
// card4.style.backgroundColor = "black";
// screen.append(card1);
// screen.append(card2);
// screen.append(card3);
// screen.append(card4);
// let testname = document.createElement("h3");
// testname.textContent = "TESTING";
// testname.style.color = "white";
// testname.style.textAlign = "center";
// testname.style.fontSize = "2.5rem";
// card1.append(testname);

// This is the function to load the previous set of pokemons.  Nothing will be loaded if starting id is 0.
back.onclick = () => {
    if (start === 0) return;
    start = start - limit;
    end = start + limit;
    loadPage(start, end);
}

// This is the function to load the next set of pokemons.  When the end is near, only load to the last pokemon
// to avoid error responses.
next.onclick = () => {
    if (end === 898) return;
    start = start + limit;
    end = (start + limit >= 898) ? 898 : start + limit;
    loadPage(start, end);
}

