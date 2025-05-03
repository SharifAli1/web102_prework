/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";
const gamesContainer = document.getElementById("games-container");

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Grab the element with the id num-contributions where the total backers will be displayed

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */
// Grab the elements where you want to display the results

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  const gamesContainer = document.getElementById("games-container");

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
        <img class="game-img" src="${game.img}" alt="${game.name}" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        <p>Pledged: $${game.pledged.toLocaleString()}</p>
        <p>Goal: $${game.goal.toLocaleString()}</p>
      `;

    gamesContainer.appendChild(gameCard);
  }
}
addGamesToPage(GAMES_JSON);

// loop over each item in the data
// create a new div element, which will become the game card
// add the class game-card to the list
// set the inner HTML using a template literal to display some info
// about each game
// TIP: if your images are not displaying, make sure there is space
// between the end of the src attribute and the end of the tag ("/>")
// append the game to the games-container

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
// Grab the element with the id num-contributions where the total backers will be displayed
const contributionsCard = document.getElementById("num-contributions");

// Use the reduce method to calculate the total number of backers (individual contributions)
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers; // Add the backers of each game to the accumulator
}, 0); // The initial value of the accumulator is 0

// Log the total number of backers to verify the result
console.log("Total Contributions (Backers):", totalContributions);

// Update the contributionsCard to display the total number of individual contributions
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`;

// Grab the element with the id total-raised where the total pledged amount will be displayed
const raisedCard = document.getElementById("total-raised");

// Use the reduce method to calculate the total pledged amount across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged; // Add the pledged amount for each game to the accumulator
}, 0); // Initial value of the accumulator is 0

// Log the total raised amount to verify the result
console.log("Total Raised:", totalRaised);

// Update the raisedCard to display the total raised amount with a dollar sign
raisedCard.innerHTML = `Total Raised: $${totalRaised.toLocaleString()}`;

// Grab the element with the id num-games where the total number of games will be displayed
const gamesCard = document.getElementById("num-games");

// Calculate the total number of games by getting the length of the GAMES_JSON array
const totalGames = GAMES_JSON.length;

// Update the gamesCard to display the total number of games
gamesCard.innerHTML = `Total Number of Games: ${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  // Clear out existing games from the page
  deleteChildElements(gamesContainer);

  // Filter games that have met or exceeded their funding goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  console.log("Number of funded games: ", fundedGames.length);
  const descriptionContainer = document.getElementById("description-container");

  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // Add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */
const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;
console.log(totalRaised);
// no need to redeclare
console.log(totalGames);

const descriptionStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} ${
  totalGames === 1 ? "game" : "games"
}. Currently, ${numUnfundedGames} ${
  numUnfundedGames === 1 ? "game remains" : "games remain"
} unfunded. We need your help to fund these amazing games!`;

const descriptionElement = document.createElement("p");
descriptionElement.innerText = descriptionStr;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */
// Sort the games from highest to lowest pledged
const sortedGames = [...GAMES_JSON].sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// Destructure the first and second games from the sorted array
const [firstGame, secondGame] = sortedGames;

// Log the first word of the most funded and second most funded games
console.log(
  "First word of the most funded game:",
  firstGame.name.split(" ")[0]
);
console.log(
  "First word of the second most funded game:",
  secondGame.name.split(" ")[0]
);

// Create and append the top 2 games to the DOM
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Create a new element for the top game and append it
const topGameElement = document.createElement("p");
topGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(topGameElement);

// Create a new element for the runner-up and append it
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

document.getElementById("our-games-btn").addEventListener("click", () => {
  document
    .getElementById("games-container")
    .scrollIntoView({ behavior: "smooth" });
});
