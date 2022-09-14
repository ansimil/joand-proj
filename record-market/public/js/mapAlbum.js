const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'

mapboxgl.accessToken = token
const mapAlbum = new mapboxgl.Map({
	container: 'mapAlbum', // container ID
	style:   'mapbox://styles/mapbox/light-v10', // style URL
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
		color: '#5fbbd0',
	}).setLngLat(coord)
	.setPopup(new mapboxgl.Popup()

	.setHTML("<h3>Hello World!</h3>"))        
    .addTo(mapAlbum)  
})



const user =  document.querySelector('#userCoord').innerHTML //'LngLat(13.25424296134969, 52.46167289022344)'
console.log(user)
const userCord = user.match(/\d+/g)
const lng =  userCord[0] + '.' + userCord[1] 
const lat =  userCord[2] + '.' + userCord[3] 

new mapboxgl.Marker({
	color: 'red',
}).setLngLat([lng, lat])        
	.addTo(mapAlbum) 

	
	
// const newYork = new mapboxgl.LngLat(-74.0060, 40.7128);
// const losAngeles = new mapboxgl.LngLat(-118.2437, 34.0522);
// newYork.distanceTo(losAngeles);
	
	