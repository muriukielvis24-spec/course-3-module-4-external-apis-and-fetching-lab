 // index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// // Your code here!

    async function fetchWeatherAlerts(state) {
  const errorDiv = document.getElementById('error-message');
  const alertsDisplay = document.getElementById('alerts-display');

  // Clear previous results and errors
  alertsDisplay.innerHTML = '';
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');

  try {
    // Fetch using the input state abbreviation
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
    if (!response.ok) throw new Error("Invalid state code or API error");

    const data = await response.json();

    // Display alerts
    displayAlerts(data, state);

    // Clear the input field after successful request
    document.getElementById('state-input').value = '';
  } catch (error) {
    // Show error message
    errorDiv.textContent = error.message;
    errorDiv.classList.remove('hidden');
  }
}

function displayAlerts(data, state) {
  const alertsDisplay = document.getElementById('alerts-display');

  // Title + number of alerts
  const summary = document.createElement('h2');
  summary.textContent = `Current watches, warnings, and advisories for ${state}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  // List each alert headline
  const ul = document.createElement('ul');
  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

// Button click handler
document.getElementById('fetch-alerts').addEventListener('click', () => {
  const state = document.getElementById('state-input').value.trim();
  if (state) {
    fetchWeatherAlerts(state);
  } else {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = "Please enter a state abbreviation.";
    errorDiv.classList.remove('hidden');
  }
});