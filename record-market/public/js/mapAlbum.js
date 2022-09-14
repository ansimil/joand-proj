const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'

mapboxgl.accessToken = token
const mapAlbum = new mapboxgl.Map({
	container: 'mapAlbum', // container ID
	style:  'mapbox://styles/mapbox/streets-v11', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 9, // starting zoom
	// pitch: 100
})

mapAlbum.addControl(new mapboxgl.NavigationControl())

const coords = [
	[13.405, 52.52],
	[13.6, 52.6]
]

coords.forEach(coord => {
	new mapboxgl.Marker({
		color: 'blue',
	}).setLngLat(coord)        
    .addTo(mapAlbum)  
})

