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

const coordsAndIDs = []
const usersId = []

const usersArrCoords = document.querySelectorAll('#usersCoordinates')

usersArrCoords.forEach(user => {
	const userObj = {}
	let userInfo = user.innerHTML
	let userCord = userInfo.split('+')[0]
	let userID = userInfo.split('+')[1]
	console.log(userID)
	const userCordArray = userCord.match(/\d+/g)
	const lng =  userCordArray[0] + '.' + userCordArray[1] 
	const lat =  userCordArray[2] + '.' + userCordArray[3] 
	const dataCoord = [lng, lat]
	userObj.userId = userID
	userObj.coordinates = dataCoord
	coordsAndIDs.push(userObj)
})




console.log (coordsAndIDs)

coordsAndIDs.forEach(coordAndID => {
	new mapboxgl.Marker({
		color: '#5fbbd0',
	}).setLngLat(coordAndID.coordinates)
	.setPopup(new mapboxgl.Popup().setHTML(`<a href="/collections/${coordAndID.userId}">See in user Collection</a>`))        
    .addTo(mapAlbum)  
})

// let linkToUser = `<a href="/collections/${coordAndID.userId}">Add to collection</a>`


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



	