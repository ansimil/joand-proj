const token = 'pk.eyJ1Ijoiam9hbm5hemllbGluc2thbSIsImEiOiJjbDgwODBpcDQwM2w0M3ZvNTl1MmZqN3lkIn0.TTZn9MHJffHxmLiUPGWoPA'

mapboxgl.accessToken = token
const mapAlbum = new mapboxgl.Map({
	container: 'mapAlbum', 
	style:   'mapbox://styles/mapbox/light-v10', 
	center: [13.404954, 52.520008],
	zoom: 9, 
	
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
	let username = userInfo.split('+')[2]
	let collectionId = userInfo.split('+')[3]
	const userCordArray = userCord.match(/\d+/g)
	const lng =  userCordArray[0] + '.' + userCordArray[1] 
	const lat =  userCordArray[2] + '.' + userCordArray[3] 
	const dataCoord = [lng, lat]
	userObj.userId = userID
	userObj.coordinates = dataCoord
	userObj.username = username
	userObj.collectionId = collectionId
	coordsAndIDs.push(userObj)
})


coordsAndIDs.forEach(coordAndID => {
	new mapboxgl.Marker({
		color: '#5fbbd0',
	}).setLngLat(coordAndID.coordinates)
	.setPopup(new mapboxgl.Popup().setHTML(`<a class="map-popup" href="/collections/collection/${coordAndID.collectionId}">Check out ${coordAndID.username}'s Collection</a>`))        
    .addTo(mapAlbum)  
})



const user =  document.querySelector('#userCoord').innerHTML 
if (user !== '') {
	const userCord = user.match(/\d+/g)
	const lng =  userCord[0] + '.' + userCord[1] 
	const lat =  userCord[2] + '.' + userCord[3] 
	
	new mapboxgl.Marker({
		color: 'red',
	}).setLngLat([lng, lat])        
		.addTo(mapAlbum) 
} 



	