/* 
AUTHOR: MRJORDILICIOUS
URL:    HTTPS://MRJORDILICIOUS.COM
TWITCH: HTTPS://TWITCH.TV/MRJORDILICIOUS
KOFI:   HTTPS://KO-FI.COM/MRJORDILICIOUS
LINKS:  HTTPS://LINKS.MRJORDILICIOUS.COM 
*/

////////////////
// PARAMETERS //
////////////////

// Get the countdown display element from the DOM
const countdownEl = document.getElementById('countdown');

// Parse the URL parameters to get the countdown time
const params = new URLSearchParams(window.location.search);
const timeParam = params.get('time') || '1m'; // Default to 1 minute if not specified

//////////
// CODE //
//////////

// Function to convert a time string like "2m45s" or "1h30m" into milliseconds
function parseTimeString(str) {
  const regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/; // Matches hours, minutes, and seconds
  const match = str.toLowerCase().match(regex);
  if (!match) return 0; // If no match, return 0 milliseconds

  // Destructure and convert matched parts to integers, default to 0
  const [, hours, minutes, seconds] = match.map(x => parseInt(x) || 0);

  // Convert to total milliseconds
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

// Convert the parsed time string to milliseconds
let remaining = parseTimeString(timeParam);

// Variable to hold the interval timer
let interval = null;

// Format milliseconds into MM:SS string for display
function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000)); // Ensure no negative time
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0'); // 2-digit minutes
  const seconds = String(totalSeconds % 60).padStart(2, '0');             // 2-digit seconds
  return `${minutes}:${seconds}`;
}

// Function to update the countdown every second
function updateCountdown() {
  countdownEl.textContent = formatTime(remaining); // Update the visible timer

  if (remaining <= 0) {
    clearInterval(interval); // Stop timer when countdown reaches 0
    return;
  }

  remaining -= 1000; // Subtract 1 second (1000ms) from the remaining time
}

// Initialize the timer display immediately
updateCountdown();

// Start the interval timer to update the display every 1000ms (1 second)
interval = setInterval(updateCountdown, 1000);