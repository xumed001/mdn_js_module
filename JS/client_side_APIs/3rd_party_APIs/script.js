
// key locked 
L.mapquest.key = 'TYJmE5jpWDCel67SiWGjwB4U8ZDvv9Lu';

// 'map' refers to a <div> element with the ID map
const map = L.mapquest.map('map', {
  center: [40.730610 , -73.935242],
  layers: L.mapquest.tileLayer('dark'),
  zoom: 12,
});

map.addControl(L.mapquest.control({
    position: 'bottomright'
}))

L.marker([53.480759, -2.242631], {
    icon: L.mapquest.icons.marker({
        primaryColor: "#22407F",
        secondaryColor: "#3B5998",
        shadow: true,
        size: "md",
        symbol: "A", 
    }),
})
    .bindPopup('This is Manchester!')
    .addTo(map)