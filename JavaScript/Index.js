// Constants
const clientId = '44384';
const redirectUri = 'YOUR_REDIRECT_URI';
const oauthUrl = 'https://www.bungie.net/en/oauth/authorize';

// Function to handle form submission
function login(event) {
  event.preventDefault(); // Prevent form submission

const apiKey = document.getElementById('apiKey').value;
  const state = Math.random().toString(36).substring(7); // Random state value

  // Save the state value to local storage for validation later
localStorage.setItem('loginState', state);

  // Construct the authorization URL
const authUrl = `${oauthUrl}?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // Redirect to Bungie's login page
window.location.href = authUrl;
}

// Add an event listener to the form submit event
document.getElementById('loginForm').addEventListener('submit', login);
