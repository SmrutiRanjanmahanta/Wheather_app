//Wheather App
const weatherform = document.querySelector(".wheaterform");
    const cityinput = document.querySelector(".cityInput");
    const card = document.querySelector(".card");
    const apikey = "cee2108ce6aee3efbcecf1e4bb5b8c17"; // replace if needed

    weatherform.addEventListener("submit", async (event) => {
      event.preventDefault();
      const city = cityinput.value.trim();

      if (city) {
        try {
          const weatherdata = await getwheatherdata(city);
          displayweatherinfo(weatherdata);
        } catch (error) {
          console.error("Fetch Error:", error);
          displayError("City not found or API error!");
        }
      } else {
        displayError("Please enter a city");
      }
    });

    async function getwheatherdata(city) {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
      console.log("API Request URL:", apiurl);

      const response = await fetch(apiurl);
      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch weather data");
      }
      return data;
    }

    function displayweatherinfo(data) {
      const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
      } = data;

      card.textContent = "";
      card.style.display = "flex";

      const citydisplay = document.createElement("h1");
      citydisplay.textContent = city;
      citydisplay.classList.add("citydisplay");

      const tempdisplay = document.createElement("p");
      tempdisplay.textContent = `${temp.toFixed(1)}°C`;
      tempdisplay.classList.add("tempdisplay");

      const humiditydisplay = document.createElement("p");
      humiditydisplay.textContent = `Humidity: ${humidity}%`;
      humiditydisplay.classList.add("humidityDisplay");

      const descdisplay = document.createElement("p");
      descdisplay.textContent = description;
      descdisplay.classList.add("descDisplay");

      const weatherEmoji = document.createElement("p");
      weatherEmoji.textContent = getwheatherEmoji(id);
      weatherEmoji.classList.add("weatherEmoji");

      card.appendChild(citydisplay);
      card.appendChild(tempdisplay);
      card.appendChild(humiditydisplay);
      card.appendChild(descdisplay);
      card.appendChild(weatherEmoji);
    }

    function getwheatherEmoji(weatherId) {
      switch (true) {
        case (weatherId >= 200 && weatherId < 300): return "⛈️";
        case (weatherId >= 300 && weatherId < 400): return "🌧️";
        case (weatherId >= 500 && weatherId < 600): return "🌧️";
        case (weatherId >= 600 && weatherId < 700): return "❄️";
        case (weatherId >= 700 && weatherId < 800): return "🌫️";
        case (weatherId === 800): return "☀️";
        case (weatherId > 800 && weatherId < 810): return "☁️";
        default: return "❓";
      }
    }

    function displayError(message) {
      const errorDisplay = document.createElement("p");
      errorDisplay.textContent = message;
      errorDisplay.classList.add("errordisplay");
      card.textContent = "";
      card.style.display = "flex";
      card.appendChild(errorDisplay);
    }
