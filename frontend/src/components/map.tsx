import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./pin";
import { HotelType } from "../../../backend/src/shared/types";
import { useEffect, useState } from "react";
import SetView from "./setview";

type Props = {
  hotels: HotelType[] | undefined;
  center : "User" | "Search";
};

function Map({ hotels, center }: Props) {
  const [userLocation, setUserLocation] = useState<[number, number]>([52.4797, -1.90269]);
  useEffect(() => {
    if (center==="User" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      }); 
    }
    else if (center === "Search" && hotels && hotels.length > 0) {
      setUserLocation([hotels[0].latitude, hotels[0].longitude]);
    }
  }, [hotels]); 
  return (
      <MapContainer
        center={userLocation}
        zoom={7}
        className="h-full w-full rounded-2xl" 
      >
        <SetView center={userLocation} /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels?.map((hotel: HotelType) => (
          <Pin hotel={hotel} key={hotel._id} />
        ))}
      </MapContainer>
  );
}

export default Map;
