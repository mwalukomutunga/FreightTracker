import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap,Tooltip } from 'react-leaflet'
import React, { useEffect, useState, useCallback } from 'react';
import Trackers from './tracerList';
import { Icon } from 'leaflet';
import './App.css';

var locations = [
  [-1.298982, 36.776811],
  [-1.297459, 36.776747],
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
  const [timer, setTimer] = useState(5000);
  const [driverName, setDriverName] = useState("Driver A");
  var today = new Date();
  useEffect(() => {

    const interval = setInterval(() => {
      updateLocation();
      setDriver({...driver,lastlocation: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+' hrs'})
    }, timer);
    return () => {
      clearInterval(interval);
    };
  }, [updateLocation]);

  const updateLocation = useCallback(() => {
    if (locations.length > index) {
       setPosition(locations[index]);
      index++;
     
    } else {     
      setTimer(20000);
      setDriverName("Driver B");
      setDriver({...driver,vehicleInfo: "KAY 800E"});
      setPosition([-1.300355, 36.773850]);
    }
  }, []);
  
  const [driver, setDriver] = useState({
    vehicleInfo: "KAY 747E",
    vehicleSize: "27 Tonnes",
    cargoType: "Flatbed",
    goodsType: "Rice",
    lastlocation: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+' hrs',
    currentlocation: currentPosition,
  });
  
  return position === null ? null : (
   <React.Fragment>
       <Marker position={position} icon={vehicleIcon} >
      <Popup>
        <div>
          <h2> {driver.vehicleInfo}</h2>
          <p> <strong>{driver.vehicleSize}</strong> | {driver.cargoType} | {driver.goodsType}</p>
          <p> Location: {driver.currentlocation}</p>
          <p> Location updated: {driver.lastlocation}</p>
        </div>
      </Popup>
      <Tooltip>{driverName}</Tooltip>
    </Marker>
    <Trackers Driver ={driver}/>
   </React.Fragment>
  )
}

