const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.notfound');

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter')
  {
    event.preventDefault();
    searchWeather();
  }
});

function searchWeather()
{
  const APIKey = 'c10c929efe812e6c95319b752e6f243d';
  const city = searchInput.value.trim();
  if (city === '') 
  {
    return;
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => 
    {
      if (json.cod === '404') 
      {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');
      switch (json.weather[0].main) 
      {
        case 'Clear':
          image.src = 'Images/clear-sky.png';
          break;
        case 'Clouds':
          image.src = 'Images/clouds.png';
          break;
        case 'Haze':
          image.src = 'Images/fog.png';
          break;
        case 'Rain':
          image.src = 'Images/raining.png';
          break;
        case 'Snow':
          image.src = 'Images/snowflake.png';
          break;
        case 'Wind':
          image.src = 'Images/wind.png';
          break;
        case 'Drizzle':
          image.src = 'Images/drizzle.png';
          break;
        case 'Overcast':
          image.src = 'Images/overcast.png';
          break;
        default:
        image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
      });
  }

  search.addEventListener('click', searchWeather);

  // Add event listener to search input field
  searchInput.addEventListener('keyup', () => {
    const city = searchInput.value.trim();

    // Clear search results if the search query is empty
    if (city === '') {
      container.style.height = '105px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'none';
    }
});