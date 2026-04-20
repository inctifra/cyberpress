import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import placeholder from "../../../images/cafe/placeholder.jpeg";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const map = L.map('map', {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false
}).setView([-1.146, 36.96], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const cybercafes = [
  {
    name: "CyberConnect Ruiru",
    lat: -1.146,
    lng: 36.96,
    image: placeholder,
    avatar: placeholder
  },
  {
    name: "QuickPrint Cyber",
    lat: -1.150,
    lng: 36.95,
    image: placeholder,
    avatar: placeholder
  },
  {
    name: "Digital Hub Cyber",
    lat: -1.140,
    lng: 36.97,
    image: placeholder,
    avatar: placeholder
  }
];

// store markers
const markers = [];
let activeMarker = null;
let index = 0;

cybercafes.forEach((cafe, i) => {
  const marker = L.marker([cafe.lat, cafe.lng]).addTo(map);
  markers.push(marker);
});

function updateCard(cafe) {
  $("#cafe-name").text(cafe.name);
  $("#cafe-image").attr("src", cafe.image);
  $("#cafe-avatar").attr("src", cafe.avatar);
}

function highlightMarker(i) {
  markers.forEach(m => {
    m.setOpacity(0.5);
  });

  markers[i].setOpacity(1);
}

function flyTour() {
  const cafe = cybercafes[index];

  map.flyTo([cafe.lat, cafe.lng], 16, {
    animate: true,
    duration: 2.5
  });

  updateCard(cafe);
  highlightMarker(index);

  index = (index + 1) % cybercafes.length;
}

flyTour();

setInterval(flyTour, 5000);
setTimeout(() => {
  map.invalidateSize();
}, 500);