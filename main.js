const api = {
  key: '99a7d64a9bcee65502a9bad006571d07',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('tempImg');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = 'images/temp-mid.png';
  if (temp > 26) {
    src = 'images/temp-high.png';    
  } else if (temp < 20) {
    src = 'images/temp-low.png';
  }
  tempImg.src = src;
}

function recomendaciones(data) {
  const temp = toCelsius(data.main.temp);

  if (temp > 26) {
    href = 'https://agn.gt/?s=recomendaciones+c%C3%A1lida';
    src = 'https://agn.gt/?s=recomendaciones+c%C3%A1lida';        
  } 
  
  else if (temp < 20) {
    href = 'https://agn.gt/?s=recomendaciones+agricultura+lluvia';
    src = 'https://agn.gt/?s=recomendaciones+agricultura+lluvia';
  }

  else if (temp > 20 && temp < 26) {
    href = 'https://agn.gt/?s=recomendaciones+agricultura';
    src = 'https://agn.gt/?s=recomendaciones+agricultura';
  }
  
  r1.href = href;
  r2.src = src;
}


async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();

    city.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${toCelsius(data.main.temp)} °C`;
    weather.innerHTML = data.weather[0].description.toUpperCase();
    range.innerHTML = `${toCelsius(data.main.temp_min)} °C / ${toCelsius(data.main.temp_max)} °C`;

    updateImages(data);
    recomendaciones(data);
    
  } catch (err) {
    console.log(err);
    alert('Ubicación no encontrada');
  }
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);
