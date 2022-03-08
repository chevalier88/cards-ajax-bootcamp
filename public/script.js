// global value that holds info about the current hand.
let currentGame = null;

// DOM manipulation function that displays the player's current hand.
const runGame = function ({ player1Hand, player2Hand }) {
  // manipulate DOM
  const player1Container = document.querySelector('#player1-container');

  const player1HandScore = player1Hand[0].rank + player1Hand[1].rank;
  const player2HandScore = player2Hand[0].rank + player2Hand[1].rank;

  player1Container.innerText = `
    Your Hand:
    ====
    ${player1Hand[0].name}
    of
    ${player1Hand[0].suit}
    ====
    ${player1Hand[1].name}
    of
    ${player1Hand[1].suit}
    ====
    Player 1's Total Score:
    ${player1HandScore}
  `;

  const player2Container = document.querySelector('#player2-container');

  player2Container.innerText = `
    Your Hand:
    ====
    ${player2Hand[0].name}
    of
    ${player2Hand[0].suit}
    ====
    ${player2Hand[1].name}
    of
    ${player2Hand[1].suit}
    ====
    Player 2's Total Score:
    ${player2HandScore}
  `;

  const infoContainer = document.querySelector('#info-container');

  // specify win declaration
  if (player1HandScore > player2HandScore) {
    infoContainer.innerText = `Game ${currentGame.id}: Player 1 Wins!`;
  } else if (player2HandScore > player1HandScore) {
    infoContainer.innerText = `Game ${currentGame.id}: Player 2 Wins!`;
  } else if (player1HandScore === player2HandScore) {
    infoContainer.innerText = `Game ${currentGame.id}: Player Round is Tied!`;
  } else if (currentGame.player1Hand[0] === null) {
    infoContainer.innerText = `Game ${currentGame.id}: Player Round is Tied!`;
  }
};

// make a request to the server
// to change the deck. set 2 new cards into the player hand.
const dealCards = function () {
  axios.put(`/games/${currentGame.id}/deal`)
    .then((response) => {
      // get the updated hand value
      currentGame = response.data;
      console.log('printing currentGame...');
      console.log(currentGame);
      // display it to the user
      runGame(currentGame);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

const createGame = function () {
  const createGameBtnAgain = document.getElementById('start-game-button');
  createGameBtnAgain.remove();
  // Make a request to create a new game
  axios.post('/games')
    .then((response) => {
      // set the global value to the new game.
      currentGame = response.data;

      console.log(currentGame);

      // display it out to the user
      runGame(currentGame);

      // for this current game, create a button that will allow the user to
      // manipulate the deck that is on the DB.
      // Create a button for it.
      const dealBtn = document.createElement('button');
      dealBtn.addEventListener('click', dealCards);

      // display the button
      const container = document.querySelector('#game-container');
      dealBtn.innerText = 'Deal';
      container.appendChild(dealBtn);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

// signup/login div is just called loginDiv
const container = document.querySelector('#game-container');
const loginDiv = document.createElement('div');
container.appendChild(loginDiv);

// email div
const emailDiv = document.createElement('div');
loginDiv.appendChild(emailDiv);
const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'email: ';
emailDiv.appendChild(emailLabel);
const emailInput = document.createElement('input');
emailInput.setAttribute('id', 'email');
emailDiv.appendChild(emailInput);

// password div
const passwordDiv = document.createElement('div');
loginDiv.appendChild(passwordDiv);
const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'password: ';
passwordDiv.appendChild(passwordLabel);
const passwordInput = document.createElement('input');
passwordInput.setAttribute('id', 'password');
passwordDiv.appendChild(passwordInput);

// create a login button
const loginBtn = document.createElement('button');
loginBtn.setAttribute('type', 'submit');
loginBtn.textContent = 'Signup/ Login';
loginDiv.appendChild(loginBtn);

// login button functionality
loginBtn.addEventListener('click', () => {
  const data = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  console.log('printing user login input data...');
  console.log(data);
  axios
    .post('/login', data)
    .then((response) => {
      console.log('printing response...');
      console.log(response);
      console.log('printing response.data response...');
      console.log(response.data);
      loginDiv.remove();

      const container = document.querySelector('#game-container');

      const loggedInDiv = document.createElement('div');
      loggedInDiv.textContent = response.data;
      container.appendChild(loggedInDiv);

      // manipulate DOM, set up create game button
      // create game btn
      const createGameBtn = document.createElement('button');
      createGameBtn.addEventListener('click', createGame);
      createGameBtn.setAttribute('id', 'start-game-button');
      createGameBtn.innerText = 'Start Game';
      container.appendChild(createGameBtn);
    })
    .catch((error) => {
      console.log(error);
    });
});
