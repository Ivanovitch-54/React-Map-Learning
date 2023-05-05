import React, { useEffect } from "react";
import { useLocation } from "./utils/hook/useLocation";
import StreetInput from "./component/StreetInput";


function App() {
  const location = useLocation();

  useEffect(() => {
    location.setTracker();
    return () => {
      // Return permet de "démonter" "unmount"
      location.removeTracker();
    };
  }, []);

  useEffect(() => {
    const mapContainer = document.querySelector("#map");

    if (mapContainer && !location.map && location.locationLoad) {
      location.getMap();
    }
  }, [location.location, location.locationLoad]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "400px",
          height: "400px",
        }}
      ></div>
      {!location.locationLoad && <div>Chargement ...</div>}
      <StreetInput />
    </>
  );
}

export default App;
