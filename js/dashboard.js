/* --------- Data has taken from the Pokemon Wiki -----------------  */
/*---------- Bar Graph to display Pokemons by Region ---------------------*/

var xValues = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar"];

var yValues = [151, 100, 135, 107, 156, 72, 88, 89];
var barColors = ["red", "green","blue","orange","brown","purple","cyan","navy"];

new Chart("pokeChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: false,
      text: "Pokemon's by Region"
    }
  }
});

/*---------- Donut chart to display Pokemon by Types ---------------------*/

var xValues1 = ["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","steel","Water"];
var yValues1 = [61, 52, 35, 44, 34, 46, 55, 88, 34, 83, 65, 38, 102, 64, 82, 52, 48, 25];
var barColors1 = [
  "#5F9EA0",
  "#6495ED",
  "#800080",
  "#DFFF00",
  "#FF00FF",
  "#DE3163",
  "#FF5F1F",
  "#FFBF00",
  "#AAFF00",
  "#00FFFF",
  "#F5DEB3",
  "#808000",
  "#F0E68C",
  "#800020",
  "#CD7F32",
  "#0437F2",
  "#CCCCFF",
  "#00008B"
];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues1,
    datasets: [{
      backgroundColor: barColors1,
      data: yValues1
    }]
  },
  options: {
    legend: {
        display: true, 
        position: "right"
       },
    title: {
      display: false,
      text: "Pokemon Types"
    }
  }
});