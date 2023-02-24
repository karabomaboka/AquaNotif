// Get the form element and input field
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

// Listen for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Get the city name from the input field
  const cityName = input.value.trim();

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // Do something with the latitude and longitude, such as display them on the page or use them to search for water availability in the user's area.
    }, error => {
      // Handle errors with getting the user's location
      console.log(error);
    });
  }
  

  // Make a request to the API to get the water status for the given city
  fetch(`https://api.aquanotif.com/water-status?city=${cityName}`)
    .then(response => response.json())
    .then(data => {
      // Display the water status for the city
      const message = `Water ${data.status} in ${cityName}`;
      displayMessage(message);
    })
    .catch(error => {
      // Display an error message if the city name is invalid or the API request fails
      const message = `Sorry, we couldn't find water status for ${cityName}. Please try again later.`;
      displayMessage(message, true);
    });
});

// Function to display a message to the user
function displayMessage(message, isError = false) {
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  messageEl.classList.add('message');
  if (isError) {
    messageEl.classList.add('error');
  }
  const main = document.querySelector('main');
  main.appendChild(messageEl);
}

function getWaterStatus(city) {
    var url = 'https://api.openwaterfoundation.org/data/water-quality-samples/location/' + city;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Parse the data and display the relevant information on the web app
      })
      .catch(error => console.error(error));
  }

  function getWaterStatus(city) {
    var url = 'https://api.openwaterfoundation.org/data/water-quality-samples/location/' + city;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Parse the data and extract the relevant information
        var status = data.water_status;
        var lastUpdate = data.last_update;
        var location = data.location;
  
        // Display the information on the web app
        document.getElementById('status').textContent = status;
        document.getElementById('last-update').textContent = lastUpdate;
        document.getElementById('location').textContent = location;
      })
      .catch(error => console.error(error));
  }
  
  