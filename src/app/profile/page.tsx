"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.svg"; 

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eef3ff;
  font-family: "Roboto", sans-serif;
  padding-bottom: 80px;
  overflow-x: hidden;
`;

const Header = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 20px 20px;
  position: relative;
  font-weight: bold;
  font-size: 20px;
`;

const Logo = styled(Image)`
  position: absolute;
  left: 15px;
  width: 150px;
  height: auto;
`;

const ProfileHeader = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;



const UserName = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0 5px;
  color: #3646ba;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const StatsContainer = styled.div`
  width: 90%;
  background: #3646ba;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StatBox = styled.div`
  text-align: center;
  flex: 1;
  min-width: 80px;
`;

const StatNumber = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const StatLabel = styled.p`
  font-size: 13px;
  color: white;
`;

const HistoryContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const HistoryTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #3646ba;
  text-align: center;
`;

const TrajetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TrajetCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
  }
`;

const TrajetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TrajetIcon = styled.div`
  width: 35px;
  height: 35px;
  background: #3646ba;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TrajetDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrajetName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #3646ba;
`;

const TrajetDate = styled.p`
  font-size: 12px;
  color: #666;
`;

const EditProfileButton = styled.button`
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  background-color: #3646ba;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 90%;
  transition: background 0.2s ease-in-out;
  &:hover {
    background-color: #2b3ca6;
  }
`;

export default function ProfilePage() {
  const router = useRouter();

  const user = {
    name: "Léa Dupont",
    email: "lea.dupont@email.com",
    stats: {
      totalRuns: 15,
      totalDistance: "12.4 km",
      totalTime: "3h 45min",
    },
    history: [
      { name: "Parc Noëform Étangs", distance: "900m", time: "12min", date: "14 Mars" },
      { name: "Bois de Vincennes", distance: "1.5km", time: "18min", date: "10 Mars" },
      { name: "Parc de Sceaux", distance: "2km", time: "22min", date: "5 Mars" },
    ],
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Hop Hop" width={50} height={50} />
        <ProfileHeader>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </ProfileHeader>
      </Header>

      

      <StatsContainer>
        <StatBox>
          <StatNumber>{user.stats.totalRuns}</StatNumber>
          <StatLabel>Trajets</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>{user.stats.totalDistance}</StatNumber>
          <StatLabel>Distance</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>{user.stats.totalTime}</StatNumber>
          <StatLabel>Temps</StatLabel>
        </StatBox>
      </StatsContainer>

      <HistoryContainer>
        <HistoryTitle>📜 Historique</HistoryTitle>
        <TrajetList>
          {user.history.map((trajet, index) => (
            <TrajetCard key={index}>
              <TrajetInfo>
                <TrajetIcon>🏃</TrajetIcon>
                <TrajetDetails>
                  <TrajetName>{trajet.name}</TrajetName>
                  <TrajetDate>{trajet.distance} - {trajet.time} - {trajet.date}</TrajetDate>
                </TrajetDetails>
              </TrajetInfo>
            </TrajetCard>
          ))}
        </TrajetList>
      </HistoryContainer>

      <EditProfileButton onClick={() => router.push("/")}>Modifier Profil</EditProfileButton>
    </Container>
  );
}
