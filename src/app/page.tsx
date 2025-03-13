"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  background-color: #eef3ff;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.div`
  padding: 20px;
  text-align: center;
  background-color: white;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  font-family: 'Roboto', sans-serif;
`;

const Logo = styled(Image)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: auto;
`;

const Section = styled.div`
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

const ObjectiveBox = styled.div`
  background-color: #3646ba;
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
`;

const StatBox = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #3646ba;
  font-family: 'Roboto', sans-serif;
`;

const ChallengesContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  font-family: 'Roboto', sans-serif;
`;

const ChallengeCard = styled.div`
  background: #ffd700;
  padding: 15px;
  border-radius: 15px;
  min-width: 250px;
  flex-shrink: 0;
  font-family: 'Roboto', sans-serif;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Roboto', sans-serif;
`;

const FeedCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Roboto', sans-serif;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #3646ba;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <Logo src="/logo.png" alt="Hop Hop" width={50} height={50} />
        Hey, Léa ! Commence à courir !
      </Header>

      <Section>
        <ObjectiveBox>
          OBJECTIF
          <p>Ne laisse pas tes baskets prendre la poussière !</p>
          <StatContainer>
            <StatBox>🏃 2 600 / 5 000</StatBox>
            <StatBox>⏳ 5 / 20 min</StatBox>
          </StatContainer>
        </ObjectiveBox>
      </Section>

      <Section>
        <h3>CHALLENGES</h3>
        <ChallengesContainer>
          <ChallengeCard>
            <p>LEEDS MARATHON</p>
            <p>14 Mars | 10h00</p>
          </ChallengeCard>
          <ChallengeCard>
            <p>CHALLENGE FOOT</p>
            <p>14 Mars | 11h30</p>
          </ChallengeCard>
        </ChallengesContainer>
      </Section>

      <Section>
        <h3>MON FEED</h3>
        <FeedContainer>
          <FeedCard>
            <p><strong>Marie_77</strong> - Vendredi 14 mars 2025 - 11h00</p>
            <p>❤️ Association Les Volants Pathusiens</p>
            <p>Distance: 1,2 km | Temps: 10m | Gain: +5 340 pas</p>
          </FeedCard>
          <FeedCard>
            <p><strong>Bertran_92</strong> - Vendredi 14 mars 2025 - 10h23</p>
            <p>❤️ Association Debout Avec Mylène</p>
            <p>Distance: 1,3 km | Temps: 20m | Gain: +5 340 pas</p>
          </FeedCard>
        </FeedContainer>
      </Section>

      <BottomNav>
        <NavItem href="/">
          🏠
          <span>Accueil</span>
        </NavItem>
        <NavItem href="/map">
          🗺️
          <span>Cartes</span>
        </NavItem>
        <NavItem href="/groupes">
          👥
          <span>Groupes</span>
        </NavItem>
        <NavItem href="/profile">
          👤
          <span>Profile</span>
        </NavItem>
      </BottomNav>
    </Container>
  );
}
