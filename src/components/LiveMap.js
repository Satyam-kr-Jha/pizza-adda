"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

function LocationPicker({ setPosition, setMaptext }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((res) => res.json())
        .then((data) => setMaptext(data.display_name));
    },
  });
  return null;
}

export default function LiveMap({ maptext, setMaptext }) {
  const [position, setPosition] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setIcon(DefaultIcon);
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then((res) => res.json())
          .then((data) => setMaptext(data.display_name));
      },
      () => alert("Location permission denied"),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!position || !icon)
    return <p className="text-zinc-700 font-bold">Loading map...</p>;

  return (
    <div className="h-full absolute w-[96%] rounded-2xl overflow-hidden">
      {maptext && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-2 rounded-xl max-w-[90%] text-center">
          📍 {maptext}
        </div>
      )}
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker setPosition={setPosition} setMaptext={setMaptext} />
        <Marker position={position} icon={icon}>
          <Popup>
            📍 Delivery here<br />
            <div className="text-xs w-fit">{maptext}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}