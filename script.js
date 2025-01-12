// State variables
let noCount = 0;
let yesPressed = false;
const phrases = [
    "No :(", "Are you sure?", "Really? :(", "I will be really sad", "I'm going to cry", "Please ;-;", "Don't do this!!!", "AAAAHHHHHHHSUHH", "You are going to break my heart", "NKDNKNSDKNSKDNKSDNKWQND"
];

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    yesButton.addEventListener('click', function() {
        handleYesClick();
    });

    noButton.addEventListener('click', function() {
        handleNoClick();
    });
}

function handleYesClick() {
    yesPressed = true;
    updateUI();
}

function handleNoClick() {
  noCount++;
  moveNoButton();
  updateUI();

  document.getElementById("question").textContent = phrases[Math.min(noCount, phrases.length - 1)];
  document.getElementById("name").style.display = "none";
}


function moveNoButton() {
    const noButton = document.getElementById('noButton');
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
}

function updateUI() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const question = document.getElementById('question');
    const image = document.getElementsByClassName('image')[0];

    if (yesPressed) {
        /** Update for Yes response **/
        question.textContent = 'YEAAAYYYYYY😘😘';
        image.src = 'images/200w.gif';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    } else {
        /** Update for No response **/
        yesButton.style.fontSize = (noCount * 20 + 15) + 'px';
        image.src = 'images/gun.gif';
    }
}

function shiftChar(char, shift) {
  return String.fromCharCode(((char.charCodeAt(0) - 32 + shift) % 95) + 32);
}

function encodeString(str, shift) {
  return str.split('').map(char => shiftChar(char, shift)).join('');
}

function decodeString(str, shift) {
  return str.split('').map(char => shiftChar(char, -shift)).join('');
}

document.getElementById('codeSubmitButton').addEventListener('click', function() {
  var userInput = document.getElementById('secretCodeInput').value;
  var encryptedUserInput = userInput;

  fetch('v4.txt')
      .then(response => response.text())
      .then(text => {
          var lines = text.split('\n');
          var encryptedPassword = lines[0];
          var originalText = lines[1];

          if (encryptedPassword == encryptedUserInput) {
              var formattedText = originalText.replace(/\n/g, '\n  ');

              displaySecretMessage(formattedText);
          } else {
              alert('you are NOTTTT HER!');
          }
      })
      .catch(error => {
          console.error('Error reading the info.txt file:', error);
      });
});


function displaySecretMessage(secretMessage) {
  /** Hide elements inside the container, but not the container itself **/
  var elementsToHide = document.querySelectorAll('.Mainprompt > *:not(#secret-message):not(#youtube-player)');

  /** Loop through and hide each element **/
  elementsToHide.forEach(function(element) {
      element.style.display = 'none';
  });

  /** Format and display the secret message **/
  var formattedMessage = secretMessage.replace(/\n/g, '<br><br>'); // Add double line breaks for paragraphs
  var secretDiv = document.getElementById('secret-message');
  secretDiv.innerHTML = formattedMessage; // Use innerHTML to allow paragraph breaks
  secretDiv.style.display = 'block';
  secretDiv.style.textAlign = 'center';

  /** Show the audio player **/
  var audioPlayer = document.getElementById('audio-player');
  audioPlayer.style.display = 'block';

  /** Optionally start the audio playback **/
  var mp3Audio = document.getElementById('mp3Audio');
  mp3Audio.play();
}