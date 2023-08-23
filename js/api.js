const apiKey = 'a0ac9af195b9430f94105816232008';

const weatherInfoElement = document.getElementById('weather-info');

// Obtener la ubicación del dispositivo
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Realizar una solicitud a la API de clima utilizando las coordenadas obtenidas
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;

        // Mostrar la información del clima en el elemento creado
        weatherInfoElement.innerHTML = ` temperatura de ${temperature}°C.`;
      })
      .catch(error => {
        console.error('Error al obtener los datos del clima:', error);
        weatherInfoElement.innerHTML = 'No se pudo obtener la información del clima.';
      });
  },
  error => {
    console.error('Error al obtener la ubicación:', error);
    weatherInfoElement.innerHTML = 'No se pudo obtener la ubicación.';
  }
);