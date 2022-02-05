var map = L.map('map').setView([3.2794189453125004, 6.489983332670651], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([6.489983332670651, -3.2794189453125004]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

function onMapClick(e) {
    console.log(e.latlng);
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}

var latlngs = [
    [
        // [41.83, -87.62],
        // [32.76, -96.72],
        // [40.78, -73.91],
        // [41.83, -87.62],
    ]
];

// var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
// var polyline = L.polygon(latlngs, { color: 'red' }).addTo(map);

// zoom the map to the polyline
// map.fitBounds(polyline.getBounds());
function isClosingPoint(latlngs) {
    // if (latlngs[0].length === 0) return false;
    console.log(latlngs[0][0][0], latlngs[0][latlngs[0].length - 1][0]);
    if (Math.abs(latlngs[0][0][0] - latlngs[0][latlngs[0].length - 1][0]) <= 0.00002 &&
        Math.abs(latlngs[0][0][1] - latlngs[0][latlngs[0].length - 1][1]) <= 0.00002) return true;
    return false;
}

function connectLines(event) {
    latlngs[0].push([event.latlng.lat, event.latlng.lng]);
    if (isClosingPoint(latlngs)) {
        if (latlngs[0][0][0] == latlngs[0][latlngs[0].length - 1][0]) return;
        latlngs[0].push(latlngs[0][0])
        L.polygon(latlngs, { color: 'green' }).addTo(map);
        map.off('click', connectLines);
        
        // Send selected area to backend

        latlngs[0].length = 0; // reset array
        return;
    }
    polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

}

// function drawLineAsMouseMoves(event) {
//     console.log("mouse is moving", event);
//     map.addEventListener('click', connectLines);
// }

function startDrawingPolygon(event) {
    // console.log("double click")
    map.addEventListener('click', connectLines);
    // map.addEventListener('mousemove', drawLineAsMouseMoves);
}

map.addEventListener('dblclick', startDrawingPolygon);

// map.on('click', onMapClick);
// map.on('dblclick', (e) => {
//     console.log(e);
//     console.log("Map was double clicked")
// });
// var latlngs = [
//     [45.51, -122.68],
//     [37.77, -122.43],
//     [34.04, -118.2]
// ];

// map.addEventListener("click", (event) => {
//     console.log("This is a click event", event);
// })
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getTodoItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

        const todoItems = response.data;

        console.log(`GET: Here's the list of todos`, todoItems);

        return todoItems;
    } catch (errors) {
        console.error(errors);
    }
};

const sendServiceArea = async () => {
    try {
        const response = await axios.post('localhost:3000')
    } catch (error) {
        console.error(error);
    }
}

getTodoItems();