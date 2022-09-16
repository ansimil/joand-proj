const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'


mapboxgl.accessToken = token
const map = new mapboxgl.Map({
	container: 'map', 
	style:   'mapbox://styles/mapbox/light-v10', 
	center: [13.404954, 52.520008], 
	zoom: 9, 
	
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
        document.querySelector('#coordinates').value = `${event.lngLat}`       
        
   }
}


map.on('click', addMarker)

