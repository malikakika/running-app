// "use client";

// import { useEffect, useState, useRef, useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";

// // 📌 Styles
// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #f8f9fa;
//   padding: 10px;
//   font-family: 'Roboto', sans-serif;
// `;

// const MapWrapper = styled.div`
//   width: 100%;
//   height: 65vh;
//   border-radius: 15px;
//   overflow: hidden;
//   position: relative;
// `;

// const InfoBar = styled.div`
//   width: 100%;
//   background: white;
//   padding: 15px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 15px 15px 0 0;
//   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
// `;

// const ActionButton = styled.button`
//   flex: 1;
//   padding: 15px;
//   margin: 0 5px;
//   font-size: 16px;
//   font-weight: bold;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const StepCounterBox = styled.div`
//   margin: 20px 0;
//   padding: 15px;
//   background: #007bff;
//   color: white;
//   font-size: 1.4rem;
//   font-weight: bold;
//   border-radius: 10px;
//   text-align: center;
//   width: 200px;
// `;

// // 📌 Icône personnalisée pour les marqueurs
// const customIcon = new L.Icon({
//   iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
//   iconSize: [38, 38],
// });

// // 📌 Composant pour recentrer la carte
// function ChangeView({ coords }: { coords: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(coords, 14);
//   }, [coords, map]);
//   return null;
// }

// // 📌 Composant principal
// export default function RunningTracker() {
//   const router = useRouter();
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [route, setRoute] = useState<L.LatLngTuple[]>([]);
//   const [steps, setSteps] = useState(0);
//   const stepsRef = useRef(0);
//   const lastTimestamp = useRef(0);

//   const startPoint = useMemo(() => [48.8588443, 2.2943506] as [number, number], []);
//   const endPoint = useMemo(() => [48.8606, 2.3376] as [number, number], []);

//   // 📌 Récupération de l'itinéraire
//   useEffect(() => {
//     const fetchRoute = async () => {
//       try {
//         const url = `https://router.project-osrm.org/route/v1/foot/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=simplified&geometries=geojson`;
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.routes.length > 0) {
//           const coordinates = data.routes[0].geometry.coordinates.map(([lon, lat]: [number, number]) => [lat, lon]);
//           setRoute(coordinates);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération du trajet :", error);
//       }
//     };
//     fetchRoute();
//   }, [startPoint, endPoint]);

//   // 📌 Géolocalisation + Compteur de pas
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.watchPosition(
//         (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
//         (error) => console.error("Erreur de géolocalisation :", error.message),
//         { enableHighAccuracy: true }
//       );
//     }

//     if ("DeviceMotionEvent" in window) {
//       let threshold = 1.5; // ✅ Ajusté pour éviter les faux positifs

//       const handleMotion = (event: DeviceMotionEvent) => {
//         const acc = event.accelerationIncludingGravity;
//         const now = Date.now();

//         if (acc && now - lastTimestamp.current > 300) { // ✅ Ajout d'un délai entre les pas
//           const totalAcceleration = Math.sqrt(
//             (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
//           );

//           if (totalAcceleration > threshold) {
//             stepsRef.current += 1;
//             setSteps(stepsRef.current);
//             lastTimestamp.current = now; 
            
//             console.log(`📱 Accéléromètre actif ! Pas détectés : ${stepsRef.current}`);
//           }
//         }
//       };

//       window.addEventListener("devicemotion", handleMotion);
//       return () => window.removeEventListener("devicemotion", handleMotion);
//     }
//   }, []);

//   return (
//     <Container>
//       <StepCounterBox>👣 {steps} pas</StepCounterBox>
//       <MapWrapper>
//         <MapContainer center={startPoint} zoom={14} style={{ width: "100%", height: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
//           {route.length > 0 && <Polyline positions={route} color="#007bff" weight={5} />} 
//           <Marker position={startPoint} icon={customIcon} />
//           <Marker position={endPoint} icon={customIcon} />
//           {position && <ChangeView coords={position} />}
//         </MapContainer>
//       </MapWrapper>
//       <InfoBar>
//         <strong style={{ color: "#007bff", fontSize: "20px" }}>Tour Eiffel → Louvre</strong>
//         <ActionButton onClick={() => router.push("/")}>Terminer</ActionButton>
//       </InfoBar>
//     </Container>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// 📌 Styles
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
`;

const StepCounterBox = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #007bff;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  width: 200px;
`;

// 📌 Composant principal
export default function RunningTracker() {
  const [steps, setSteps] = useState(0);
  const stepsRef = useRef(0);
  const lastTimestamp = useRef(0);

  // 📌 Compteur de pas avec accéléromètre
  useEffect(() => {
    if ("DeviceMotionEvent" in window) {
      let threshold = 1.5; // ✅ Ajusté pour éviter les faux positifs

      const handleMotion = (event: DeviceMotionEvent) => {
        const acc = event.accelerationIncludingGravity;
        const now = Date.now();

        if (acc && now - lastTimestamp.current > 300) { // ✅ Ajout d'un délai entre les pas
          const totalAcceleration = Math.sqrt(
            (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
          );

          if (totalAcceleration > threshold) {
            stepsRef.current += 1;
            setSteps(stepsRef.current);
            lastTimestamp.current = now; // ✅ Mise à jour du dernier pas détecté

            // 🚀 Console log les pas détectés
            console.log(`📱 Accéléromètre actif ! Pas détectés : ${stepsRef.current}`);
          }
        }
      };

      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    } else {
      console.error("❌ DeviceMotionEvent non supporté sur ce navigateur.");
    }
  }, []);

  return (
    <Container>
      <StepCounterBox>👣 {steps} pas</StepCounterBox>
    </Container>
  );
}
