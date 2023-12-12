
import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup,ZoomControl } from "react-leaflet";
import { useGeolocation } from "react-use";
import "./geolocalisation.css"; 

export function Geolocation() {
  // Coordonnées du restaurant (exemple)
  const restaurantPosition = [4.030270, 11.533110];

  const geolocation = useGeolocation();
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [distance, setDistance] = useState(null);
  const userIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const restaurantIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      //  position de l'utilisateur avec les coordonnées de la géolocalisation
      setUserPosition([geolocation.latitude, geolocation.longitude]);

      // Calcul de la distance entre le restaurant et la position de l'utilisateur
      const distanceInKm = calculateDistance(
        restaurantPosition,
        [geolocation.latitude, geolocation.longitude]
      );

      setDistance(distanceInKm);
    }
  }, [geolocation]);

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371; // Rayon de la Terre en kilomètres

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance en kilomètres

    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const getPrice = (distance) => {
    // Barème de tarification (exemple)
    const pricePerKm = 250 / 7;
    const price = distance * pricePerKm;
    return price;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={userPosition}
        zoom={0}
        className="custom-map"
        zoomControl={false} // classe pour appliquer des styles personnalisés
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={restaurantPosition} icon={restaurantIcon}>
          <Popup>Restaurant</Popup>
        </Marker>
        {geolocation.latitude && geolocation.longitude && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Votre position actuelle</Popup>
          </Marker>
        )}
        <ZoomControl position="bottomright" />
      </MapContainer>
      {distance !== null && (
        <div className="localisation">
          <p>Distance entre vous et le restaurant situe a bastos face jc : {distance.toFixed(2)} km</p>
          <p>Prix à payer pour la livraison : {getPrice(distance).toFixed(2)} fcfa</p>
        </div>
      )}
    </div>
  );
}
