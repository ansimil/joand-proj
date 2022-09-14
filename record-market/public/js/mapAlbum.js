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

const coords = []

const usersArrCoords = document.querySelectorAll('.usersCoo')
usersArrCoords.forEach(user => {
	let userCord = user.innerHTML
	const userCordArray = userCord.match(/\d+/g)
	const lng =  userCordArray[0] + '.' + userCordArray[1] 
	const lat =  userCordArray[2] + '.' + userCordArray[3] 
	const dataCoord = [lng, lat]
	coords.push(dataCoord)
})

console.log (coords)

coords.forEach(coord => {
	new mapboxgl.Marker({
		color: '#5fbbd0',
	}).setLngLat(coord)
	.setPopup(new mapboxgl.Popup().setHTML("<h3>Hello World!</h3>"))        
    .addTo(mapAlbum)  
})



const user =  document.querySelector('#userCoord').innerHTML //'LngLat(13.25424296134969, 52.46167289022344)'
if (user !== '') {
	const userCord = user.match(/\d+/g)
	const lng =  userCord[0] + '.' + userCord[1] 
	const lat =  userCord[2] + '.' + userCord[3] 
	
	new mapboxgl.Marker({
		color: 'red',
	}).setLngLat([lng, lat])        
		.addTo(mapAlbum) 
} 



	
	
// const newYork = new mapboxgl.LngLat(-74.0060, 40.7128);
// const losAngeles = new mapboxgl.LngLat(-118.2437, 34.0522);
// newYork.distanceTo(losAngeles);
	
	