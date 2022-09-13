const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'

mapboxgl.accessToken = token
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("MAP!");
    },
    false
  );