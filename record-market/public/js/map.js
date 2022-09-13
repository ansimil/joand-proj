const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'

mapboxgl.accessToken = token
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style:  'mapbox://styles/mapbox/streets-v11', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 9, // starting zoom
	// pitch: 100
})
map.addControl(new mapboxgl.NavigationControl())

let count = 0
function addMarker(event) {   
   if (count === 0) {
    new mapboxgl.Marker({
		color: 'red',
        draggable: true
	}).setLngLat(event.lngLat)        
		.addTo(map)        
        .on('dragend', event => document.querySelector('#coordinates').value = `${event.target._lngLat}`)
        count ++
        console.log(event.lngLat)
        document.querySelector('#coordinates').value = `${event.lngLat}`       
        
   }
}


map.on('click', addMarker)