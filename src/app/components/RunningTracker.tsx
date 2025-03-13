"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Polyline } from "react-leaflet"; 

import "leaflet/dist/leaflet.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const userIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 38],
});

const startIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/marker-icon.png",
  iconSize: [30, 40],
});

const endIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/marker-icon-red.png",
  iconSize: [30, 40],
});

const startPoint: [number, number] = [48.8588443, 2.2943506]; // Tour Eiffel
const endPoint: [number, number] = [48.8606, 2.3376]; // Louvre

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  font-family: "Roboto", sans-serif;
  overflow: hidden;
`;

const MapBackground = styled(MapContainer)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Met la carte en arrière-plan */
`;

const InfoBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MetricValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #3643ba;
`;

const CircularContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 70px;
  width: 100%;
  padding-top: 15px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 19px 2px;
  width: 150.5px;
  height: auto;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  ${({ primary }) =>
    primary
      ? `
    background: #3643BA;
    color: white;
  `
      : `
    background: white;
    color: #3643BA;
    border: 2px solid #3643BA;
  `}
`;
const MetricLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

export default function RunningTracker() {
  const [steps, setSteps] = useState(0);
  const [route, setRoute] = useState<[number, number][]>([]);

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [tracking, setTracking] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const stepsRef = useRef(0);
  const lastTimestamp = useRef(0);
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
  const stepGoal = 900;
  const totalTime = 12 * 60; 
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const router = useRouter();

  const toggleTracking = async () => {
    if (!permissionGranted) {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (
            DeviceMotionEvent as any
          ).requestPermission();
          if (permission !== "granted") {
            console.error(" Permission refusée pour l'accéléromètre.");
            return;
          }
        } catch (error) {
          console.error("Erreur lors de la demande de permission :", error);
          return;
        }
      }
      setPermissionGranted(true);
    }

    if (!tracking) {
      startMotionTracking();
      startTimer();
    } else {
      window.removeEventListener("devicemotion", handleMotion);
    }
    setTracking(!tracking);
  };

  const handleMotion = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    const now = Date.now();

    if (acc) {
      const diffX = Math.abs((acc.x ?? 0) - lastAcceleration.current.x);
      const diffY = Math.abs((acc.y ?? 0) - lastAcceleration.current.y);
      const diffZ = Math.abs((acc.z ?? 0) - lastAcceleration.current.z);

      const totalAcceleration = Math.sqrt(
        (acc.x ?? 0) ** 2 + (acc.y ?? 0) ** 2 + (acc.z ?? 0) ** 2
      );

      if (
        now - lastTimestamp.current > 1000 &&
        (diffX > 1.8 || diffY > 1.8 || diffZ > 1.8) &&
        totalAcceleration > 4.0
      ) {
        stepsRef.current += 1;
        setSteps(stepsRef.current);
        lastTimestamp.current = now;
      }

      lastAcceleration.current = {
        x: acc.x ?? 0,
        y: acc.y ?? 0,
        z: acc.z ?? 0,
      };
    }
  };

  const startMotionTracking = () => {
    if ("DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion);
    } else {
      console.error(" DeviceMotionEvent non supporté sur ce navigateur.");
    }
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTracking = () => {
    window.removeEventListener("devicemotion", handleMotion);
    alert(`Session terminée ! Nombre total de pas : ${steps}`);
    router.push("/");
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (error) => console.error("Erreur de géolocalisation :", error.message),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (error) => console.error("Erreur de géolocalisation :", error.message),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/foot/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=simplified&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            ([lon, lat]: [number, number]) => [lat, lon]
          );
          setRoute(coordinates);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du trajet :", error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <Container>
      <MapBackground center={startPoint} zoom={14}>
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {/* Marqueur Point de Départ (Tour Eiffel) */}
        <Marker position={startPoint} icon={startIcon} />

        {/* Marqueur Point d’Arrivée (Louvre) */}
        <Marker position={endPoint} icon={endIcon} />

        {/* Affichage du trajet */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="blue"
            weight={5}
            dashArray="5,10"
          />
        )}

        {/*  Position actuelle de l'utilisateur */}
        {position && <Marker position={position} icon={userIcon} />}
      </MapBackground>

      <InfoBar>
        <MetricsContainer>
          <Metric>
            <MetricValue>{steps}/900M</MetricValue>
            <CircularContainer>
              <CircularProgressbar
                value={(steps / stepGoal) * 100}
                styles={buildStyles({
                  pathColor: "#007bff",
                  trailColor: "#ddd",
                  textColor: "transparent",
                })}
              />
            </CircularContainer>
            <MetricLabel>Distance restante</MetricLabel>
          </Metric>

          <Metric>
            <MetricValue>
              {Math.floor(timeLeft / 60)}/{12} min
            </MetricValue>
            <CircularContainer>
              <CircularProgressbar
                value={(timeLeft / totalTime) * 100}
                styles={buildStyles({
                  pathColor: "#FFBF00",
                  trailColor: "#ddd",
                  textColor: "transparent",
                })}
              />
            </CircularContainer>
            <MetricLabel>Temps restant</MetricLabel>
          </Metric>
        </MetricsContainer>

        <ActionButtonsContainer>
          <ActionButton primary onClick={toggleTracking}>
            {tracking ? "Pause" : "Démarrer"}
          </ActionButton>
          <ActionButton onClick={stopTracking}>Terminer</ActionButton>
        </ActionButtonsContainer>
      </InfoBar>
    </Container>
  );
}
