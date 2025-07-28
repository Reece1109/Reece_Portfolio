const apiKey = "90370f614aa6377a271a430582b619f6";
const videoElement = document.getElementById("rainBackground");

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "Please enter a city.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        result.innerHTML = `City not found: ${city}`;
        return;
      }

      const { name } = data;
      const { temp, humidity } = data.main;
      const { description, main } = data.weather[0];
      const { speed } = data.wind;

      result.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${speed} m/s</p>
      `;

      // Update video source based on weather condition (only if videoElement exists)
      if (videoElement) {
        let videoSrc = "default.mp4"; // fallback

        if (main.toLowerCase().includes("clear")) {
          videoSrc = "clear.mp4";
        } else if (main.toLowerCase().includes("rain")) {
          videoSrc = "rain.mp4";
        } else if (main.toLowerCase().includes("cloud")) {
          videoSrc = "clouds.mp4";
        }

        if (videoElement.src !== videoSrc) {
          videoElement.src = videoSrc;
          videoElement.load();
          videoElement.play().catch(e => {
            // Handle autoplay policy restrictions silently
            console.warn("Video play prevented:", e);
          });
        }
      }
    })
    .catch(err => {
      result.innerHTML = "Failed to fetch weather.";
      console.error("Fetch error:", err);
    });
});
