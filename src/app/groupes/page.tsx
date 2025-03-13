"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 📌 Styles globaux
const Container = styled.div`
  background-color: #f5f7ff;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  background-color: #3646ba;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 20px 20px 50px 50px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
  font-style: italic;
`;

const AssociationsList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 25px;
  padding-bottom: 15px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  flex-shrink: 0;
`;

const AssociationLogo = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

const ProgressBar = styled.div`
  background: #eee;
  height: 8px;
  border-radius: 5px;
  margin: 8px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background-color: #ff9500;
  width: ${(props) => props.width}%;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  background-color: #3646ba;
  color: white;
`;

export default function GroupsPage() {
  const router = useRouter();

  const associationsNearby = [
    {
      name: "Club ESSPO Football",
      description: "Pratique du football féminin en loisirs et en compétition.",
      goal: "chaussures de foot",
      progress: 56,
      remainingSteps: "75 000 pas restants",
      logo: "/club-esspo-logo.png",
    },
    {
      name: "Les Volants Badminton",
      description: "Pratique du badminton en loisirs et compétition.",
      goal: "nouveaux volants",
      progress: 42,
      remainingSteps: "81 500 pas restants",
      logo: "/badminton-logo.png",
    },
  ];

  const associationsFrance = [
    {
      name: "Fondation Octobre Rose",
      description: "Soutien aux personnes atteintes du cancer du sein.",
      goal: "actions de sensibilisation",
      progress: 70,
      remainingSteps: "50 000 pas restants",
      logo: "/octobre-rose-logo.png",
    },
    {
      name: "Sports pour Tous",
      description: "Encourager l'activité physique pour tous les âges.",
      goal: "équipements sportifs",
      progress: 35,
      remainingSteps: "100 000 pas restants",
      logo: "/sports-pour-tous-logo.png",
    },
  ];

  return (
    <Container>
      {/* Header */}
      <Header>
        CHOISIS TON ASSO
        <CloseButton onClick={() => router.push("/")}>✖</CloseButton>
      </Header>

      {/* Section - Associations proches */}
      <SectionTitle>Les assos proche de chez moi</SectionTitle>
      <AssociationsList>
        {associationsNearby.map((asso, index) => (
          <Card key={index}>
            <AssociationLogo src={asso.logo} alt={asso.name} width={70} height={70} />
            <h3>{asso.name}</h3>
            <p>{asso.description}</p>
            <p>
              <strong>Pour avoir des {asso.goal}</strong>
            </p>
            <ProgressBar>
              <ProgressFill width={asso.progress} />
            </ProgressBar>
            <p style={{ fontSize: "12px", color: "#666" }}>{asso.remainingSteps}</p>
            <Button>Découvrir</Button>
            <Button>J’aide</Button>
          </Card>
        ))}
      </AssociationsList>

      {/* Section - Associations en France */}
      <SectionTitle>Les assos en France</SectionTitle>
      <AssociationsList>
        {associationsFrance.map((asso, index) => (
          <Card key={index}>
            <AssociationLogo src={asso.logo} alt={asso.name} width={70} height={70} />
            <h3>{asso.name}</h3>
            <p>{asso.description}</p>
            <p>
              <strong>Pour avoir des {asso.goal}</strong>
            </p>
            <ProgressBar>
              <ProgressFill width={asso.progress} />
            </ProgressBar>
            <p style={{ fontSize: "12px", color: "#666" }}>{asso.remainingSteps}</p>
            <Button>Découvrir</Button>
            <Button>J’aide</Button>
          </Card>
        ))}
      </AssociationsList>
    </Container>
  );
}