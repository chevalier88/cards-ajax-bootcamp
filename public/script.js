// global value that holds info about the current hand.
let currentGame = null;

// signup/login div is just called loginDiv
const loginDiv = document.createElement('div');
document.body.appendChild(loginDiv);

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
loginBtn.textContent = 'Log In';
loginDiv.appendChild(loginBtn);

// create a user signup button
const signupBtn = document.createElement('button');
signupBtn.setAttribute('type', 'submit');
signupBtn.textContent = 'Sign Up';
loginDiv.appendChild(signupBtn);

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
      console.log('printing response.data response...');
      console.log(response.data);
      loginDiv.remove();

      const loggedInDiv = document.createElement('div');
      loggedInDiv.textContent = `Logged In as Player ${response.data.id}`;
      document.body.appendChild(loggedInDiv);
      // axios
      //   .get('/user')
      //   .then((response1) => {
      //     console.log(response1.data);
      //     userDiv.innerText = response1.data.user.email;
      //   })
      //   .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

// DOM manipulation function that displays the player's current hand.
const runGame = function ({ playerHand }) {
  // manipulate DOM
  const gameContainer = document.querySelector('#game-container');

  gameContainer.innerText = `
    Your Hand:
    ====
    ${playerHand[0].name}
    of
    ${playerHand[0].suit}
    ====
    ${playerHand[1].name}
    of
    ${playerHand[1].suit}
  `;
};

// make a request to the server
// to change the deck. set 2 new cards into the player hand.
const dealCards = function () {
  axios.put(`/games/${currentGame.id}/deal`)
    .then((response) => {
      // get the updated hand value
      currentGame = response.data;

      // display it to the user
      runGame(currentGame);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

const createGame = function () {
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
      dealBtn.innerText = 'Deal';
      document.body.appendChild(dealBtn);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

// manipulate DOM, set up create game button
// createGameBtn.addEventListener('click', createGame);
// createGameBtn.innerText = 'Create Game';
// document.body.appendChild(createGameBtn);
