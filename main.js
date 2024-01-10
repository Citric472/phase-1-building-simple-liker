// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden');

// Function to handle like button click

function handleLike(event) {
  const likeGlyph = event.target;
  
  // Check if the heart is currently liked (full)
  const isLiked = likeGlyph.innerText === FULL_HEART;

  mimicServerCall()
    .then(() => {
      if (isLiked) {
        // If already liked, change back to empty heart
        likeGlyph.innerText = EMPTY_HEART;
        likeGlyph.classList.remove('activated-heart');
      } else {
        // If not liked, update the appearance of the heart
        likeGlyph.innerText = FULL_HEART;
        likeGlyph.classList.add('activated-heart');
      }
    })
    .catch((error) => {
      // On failure, display the error modal
      const modalMessage = document.getElementById('modal-message');
      modalMessage.innerText = error;
      errorModal.classList.remove('hidden');
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}


// Event listener for like button click
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-glyph');
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', handleLike);
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
