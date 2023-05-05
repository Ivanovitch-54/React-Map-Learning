import React, { useState, createContext, useContext } from "react";
import L from "leaflet";

const locationContext = createContext();

export function LocationProvider({ children }) {
  const location = useProvideLocation();
  return (
    <locationContext.Provider value={location}>
      {children}
    </locationContext.Provider>
  );
}

export const useLocation = () => {
  return useContext(locationContext);
};

function useProvideLocation() {
  const [location, setLocation] = useState({ long: 0, lat: 0 });
  const [trackerId, setTrackerId] = useState(0); // stockera l'id de l'interval pour pouvoir l'arrêter
  const [map, setMap] = useState(null)
  const [locationLoad, setLocationLoad] = useState(false)
  const [positionMarker, setPositionMarker] = useState()
  const [startMarker, setStartMarker] = useState(null)

  const setTracker = () => {
    const id = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            long: position.coords.longitude,
            lat: position.coords.latitude
          })
          console.log(location)
            setLocationLoad(true)
        
        }
      );
    }, 5000);

    setTrackerId(id);
  }

  const addMarker = (lat, long) => {
    if(startMarker !== null){
        startMarker.remove()
    }
    positionMarker.remove()
    const start = L.marker([lat, long]).addTo(map)
    setStartMarker(start)
     map.setView([lat, long], 13)
  }

  const removeTracker = () => {
    clearInterval(trackerId);
  };

  // L correspond à leaflet
  const getMap = (id = 'map') => {
    if (id) {
        const map = L.map(id).setView([location.lat, location.long], 13) 
        setMap(map)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map)
        const marker = L.marker([location.lat, location.long]).addTo(map)
        setPositionMarker(marker)
    }
    return false
  }

  return {
    map,
    location,
    locationLoad,
    setTracker,
    removeTracker,
    getMap,
    addMarker
  };
}
