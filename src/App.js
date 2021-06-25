import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { useEffect, useState, useCallback } from 'react';
import { Icon } from 'leaflet';
import './App.css';
var driverA = {
  vehicleInfo: "KAY 747E",
  vehicleSize: "27 Tonnes",
  cargoType: "Flatbed",
  goodsType: "Rice",
  lastlocation: "10Mins ago",
  currentlocation: "Nairobi, Kenya",
}
var locations = [
  [-1.297459, 36.776747]
  [-1.296193, 36.776726],
  [-1.296097, 36.779236],
  [-1.296151, 36.777637],
  [-1.296215, 36.776693],
  [-1.294252, 36.776586],
  [-1.294048, 36.776790],
  [-1.293973, 36.779118],
  [-1.292622, 36.779075],
  [-1.291844, 36.779049]
]
function App() {


  return (
    <MapContainer center={[-1.298982, 36.776811]} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default App;


const LocationMarker = () => {
  var index = 0;
  const vehicleIcon = new Icon({
    iconUrl: '/25_freight.png',
    iconSize: [30, 30]
  });
  const [position, setPosition] = useState([-1.298982, 36.776811]);
  const [currentPosition, setCurrentPosition] = useState("Nairobi, Kilimani");
  const map = useMap()
  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [updateLocation]);

  const updateLocation = useCallback(() => {
    if (locations.length > index) {
      index++;
      setPosition(locations[index]);
      setCurrentPosition("What")
    } else {
      return;
    }
  }, []);
  var today = new Date();
  const [driver, setDriver] = useState({
    vehicleInfo: "KAY 747E",
    vehicleSize: "27 Tonnes",
    cargoType: "Flatbed",
    goodsType: "Rice",
    lastlocation: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+' hrs',
    currentlocation: currentPosition,
  });
  
  return position === null ? null : (
    <Marker position={position} icon={vehicleIcon} >
      <Popup>
        <div>
          <h2> {driver.vehicleInfo}</h2>
          <h4> {driver.vehicleSize} | {driver.cargoType} | {driver.goodsType}</h4>
          <h4> Location: {driver.currentlocation}</h4>
          <h4> Location updated: {driver.lastlocation}</h4>
        </div>
      </Popup>
    </Marker>
  )
}
const CurrLocationMarker = () => {
  const vehicleIcon = new Icon({
    iconUrl: '/25_freight.png',
    iconSize: [30, 30]
  });
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={vehicleIcon} >
      <Popup>
        <div>
          <h2> {driverA.vehicleInfo}</h2>
          <h4> {driverA.vehicleSize} | {driverA.cargoType} | {driverA.goodsType}</h4>
          <h4> Location: {driverA.currentlocation}</h4>
          <h4> Location updated: {driverA.lastlocation}</h4>
        </div>
      </Popup>
    </Marker>
  )
}
