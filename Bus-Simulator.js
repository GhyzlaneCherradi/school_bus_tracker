const { io } = require('socket.io-client');

// Connect to the WebSocket Gateway 
const socket = io('http://localhost:3000/tracking');

// from ONCF Gare  to Marjane 
const routeCoordinates = [
    { latitude: 33.6953, longitude: -7.3897 }, // Start: ONCF Gare
    { latitude: 33.6975, longitude: -7.3780 }, // Bd Hassan II
    { latitude: 33.7010, longitude: -7.3650 }, // Near Park
    { latitude: 33.7050, longitude: -7.3550 }, // Towards Marjane
    { latitude: 33.7083, longitude: -7.3491 }  // End: Marjane
];

let currentIndex = 0;
// reverse array direction when reaching the end 
let forward = true;

socket.on('connect', () => {
  console.log(`[Simulator Driver] Connected to backend with ID ${socket.id}`);
  
  // Start sending location every 3 seconds
  setInterval(() => {
    const currentLoc = routeCoordinates[currentIndex];
    const payload = {
      busId: 'Bus-12',
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      timestamp: new Date().toISOString()
    };

    console.log(`[Simulator Driver] Emitting location: ${payload.latitude}, ${payload.longitude}`);
    socket.emit('updateLocation', payload);

    // next index
    if (forward) {
      if (currentIndex < routeCoordinates.length - 1) {
        currentIndex++;
      } else {
        forward = false;
        currentIndex--;
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        forward = true;
        currentIndex++;
      }
    }
  }, 3000);
});

socket.on('disconnect', () => {
  console.log('[Simulator Driver] Disconnected from backend.');
});
