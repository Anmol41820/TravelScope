const map = L.map('map').setView([20,0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

const infoPanel = document.getElementById('info-panel');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// Set initial state before the user clicks anywhere
infoPanel.innerHTML = `
  <div style="text-align:center; padding: 30px 0;">
    <h2 style="color:#714bfc; margin-bottom:10px; animation:fadeInDown 1s;">Welcome to World Explorer</h2>
    <div style="font-size:1.22em; margin-bottom:16px; animation:fadeInUp 1.2s;">
      🗺️ Click anywhere on the map to view local <span style="color:#346beb;">weather</span>, 
      <span style="color:#fb2">famous places</span>, and 
      <span style="color:#fb0">travel tips</span> for that area!
    </div>
    <div style="font-size:1.1em; color:#888;">
      Discover hidden gems, plan your trip, and explore the world by clicking on any location.
    </div>
    <div style="margin-top:18px;">
      <img src="https://img.icons8.com/color/96/globe--v2.png" alt="Globe" style="width:72px;animation:bounceIn 1.6s;">
    </div>
  </div>
`;

const icons = {
    "Clear sky": "sunny",
    "Mainly clear": "sunny",
    "Partly cloudy": "cloudy",
    "Overcast": "cloudy",
    "Fog": "cloudy",
    "Depositing rime fog": "cloudy",
    "Light drizzle": "rainy",
    "Moderate drizzle": "rainy",
    "Dense drizzle": "rainy",
    "Freezing drizzle": "cold",
    "Dense freezing drizzle": "cold",
    "Slight rain": "rainy",
    "Moderate rain": "rainy",
    "Heavy rain": "rainy",
    "Freezing rain": "cold",
    "Heavy freezing rain": "cold",
    "Slight snow fall": "cold",
    "Moderate snow fall": "cold",
    "Heavy snow fall": "cold",
    "Snow grains": "cold",
    "Slight rain showers": "rainy",
    "Moderate rain showers": "rainy",
    "Violent rain showers": "stormy",
    "Slight snow showers": "cold",
    "Heavy snow showers": "cold",
    "Slight/Moderate thunderstorm": "stormy",
    "Thunderstorm with slight hail": "stormy",
    "Thunderstorm with heavy hail": "stormy"
};

function determineTheme(temp, weather_desc) {
    if (icons[weather_desc]) return icons[weather_desc];
    if (temp >= 35) return "hot";
    if (temp < 5) return "cold";
    if (temp < 18) return "cloudy";
    return "sunny";
}

map.on('click', function(e) {
    infoPanel.innerHTML = "<p style='text-align:center'>Loading...</p>";

    fetch('/location_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng })
    })
    .then(resp => resp.json())
    .then(data => {
        let theme = determineTheme(data.temperature, data.weather_desc);
        document.body.className = theme;

        let icon = icons[data.weather_desc] || 'sunny';
        let iconHtml = `<span class="weather-icon ${icon}"></span>`;

        let title = `${data.city ? data.city + ", " : ""}${data.state ? data.state + ", " : ""}${data.country}`;
        let weatherSection = `
            <strong>Current Temp:</strong> ${data.temperature} °C<br>
            <strong>Weather:</strong> ${iconHtml} ${data.weather_desc}
        `;
        let famousSection = data.famous_for ? `<strong>Famous for:</strong> ${data.famous_for}` : "";
        let placesSection = data.nearby_places.length ? `<strong>Nearby:</strong><ul>${
          data.nearby_places.map(p=>`<li>${p}</li>`).join("")
        }</ul>` : "";
        let forecastSection = data.forecast.length ? `<strong>Next 4 Days:</strong>
          <table style="width:100%;margin-top:7px">
            <tr><th>Date</th><th>Min °C</th><th>Max °C</th><th>Description</th></tr>
            ${data.forecast.map(f => `<tr>
                <td>${f.date}</td>
                <td>${f.min}</td>
                <td>${f.max}</td>
                <td>${f.desc}</td>
            </tr>`).join('')}
          </table>` : "";
        infoPanel.innerHTML = `
          <h2>${title}</h2>
          <div style="margin-bottom:8px">${weatherSection}</div>
          <div style="margin-bottom:8px">${famousSection}</div>
          <div style="margin-bottom:8px">${placesSection}</div>
          <div style="margin-top:18px">${forecastSection}</div>
        `;
    })
    .catch(e => {
        infoPanel.innerHTML = `<p>Could not fetch information.</p>`;
    });
});



searchBtn.addEventListener('click', function() {
    let query = searchInput.value.trim();
    if (!query) return;
    infoPanel.innerHTML = "<p style='text-align:center'>Searching...</p>";

    fetch('/geocode', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({place: query})
    })
    .then(resp => {
        if (!resp.ok) throw new Error("Place not found");
        return resp.json();
    })
    .then(data => {
        map.setView([data.lat, data.lng], 11);
        fetch('/location_info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: data.lat, lng: data.lng })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Data received:", data);
            let theme = determineTheme(data.temperature, data.weather_desc);
            document.body.className = theme;
            let icon = icons[data.weather_desc] || 'sunny';
            let iconHtml = `<span class="weather-icon ${icon}"></span>`;
            let title = `${data.city ? data.city + ", " : ""}${data.state ? data.state + ", " : ""}${data.country}`;
            let weatherSection = `
                <strong>Current Temp:</strong> ${data.temperature} °C<br>
                <strong>Weather:</strong> ${iconHtml} ${data.weather_desc}
            `;
            let famousSection = data.desc ? `<strong>Description:</strong> ${data.desc}` :
                   data.famous_for ? `<strong>Description:</strong> ${data.famous_for}` : "";

            let placesSection = (data.places || data.nearby_places) ? `<strong>Nearby:</strong><ul>${
    (data.places || data.nearby_places).map(p=>`<li>${p}</li>`).join("")
}</ul>` : "";
            let forecastSection = data.forecast.length ? `<strong>Next 4 Days:</strong>
              <table style="width:100%;margin-top:7px">
                <tr><th>Date</th><th>Min °C</th><th>Max °C</th><th>Description</th></tr>
                ${data.forecast.map(f => `<tr>
                    <td>${f.date}</td>
                    <td>${f.min}</td>
                    <td>${f.max}</td>
                    <td>${f.desc}</td>
                </tr>`).join('')}
              </table>` : "";
            infoPanel.innerHTML = `
              <h2>${title}</h2>
              <div style="margin-bottom:8px">${weatherSection}</div>
              <div style="margin-bottom:8px">${famousSection}</div>
              <div style="margin-bottom:8px">${placesSection}</div>
              <div style="margin-top:18px">${forecastSection}</div>
            `;
        });
    })
    .catch(() => {
        infoPanel.innerHTML = "<p style='text-align:center'>Place not found.</p>";
    });
});


// Optional: trigger search on Enter key
searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') searchBtn.click();
});
