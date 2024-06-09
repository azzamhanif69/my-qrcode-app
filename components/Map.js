import { useEffect } from "react";
import L from "leaflet";

const Map = ({ address }) => {
  useEffect(() => {
    const map = L.map("map").setView([-6.2, 106.816666], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const latlng = [data[0].lat, data[0].lon];
          map.setView(latlng, 13);
          L.marker(latlng).addTo(map).bindPopup(address).openPopup();
        } else {
          alert("Geocode was not successful.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Geocode was not successful.");
      });
  }, [address]);

  return null;
};

export default Map;
