function initMap() {
    const comercioLatLng = { lat: 10.000062039995493, lng: -84.21519095586508 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: comercioLatLng,
      zoom: 16,
      mapTypeId: "roadmap",
    });
  
    // Agregar el marcador para el comercio
    const marker = new google.maps.Marker({
      position: comercioLatLng,
      map: map,
      title: "Health Factory",
    });
  
    // Obtener la ubicación actual del usuario al hacer clic en el botón 'Cómo llegar'
    document.getElementById("botonMapa").addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
  
          // Crear una instancia del servicio de direcciones de Google Maps
          const directionsService = new google.maps.DirectionsService();
  
          // Crear una instancia del mapa de direcciones de Google Maps
          const directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(map);
  
          // Configurar la solicitud de ruta
          const request = {
            origin: userLatLng,
            destination: comercioLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          };
  
          // Obtener la ruta y mostrarla en el mapa
          directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
  
              // Mostrar los detalles de la ruta en el mapa
              const route = result.routes[0];
              const leg = route.legs[0];
              const distanciaKm = leg.distance.text;
              const tiempoEstimado = leg.duration.text;
  
              const infoWindow = new google.maps.InfoWindow({
                content: `<strong>Distancia:</strong> ${distanciaKm}<br><strong>Tiempo estimado:</strong> ${tiempoEstimado}`,
              });
  
              infoWindow.open(map, marker);
            } else {
              alert("No se pudo trazar la ruta. Error: " + status);
            }
          });
        });
      } else {
        alert("Geolocalización no soportada en este navegador.");
      }
    });
  }
  
  window.initMap = initMap;