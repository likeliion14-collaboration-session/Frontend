import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPhotoUpload = location.pathname === "/photo-upload";

  return (
    <Container>
      {isPhotoUpload && (
        <BackButton onClick={() => navigate("/")}>◀</BackButton>
      )}

      <Title>{isPhotoUpload ? "핀 등록" : ""}</Title>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 52px;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
`;

const BackButton = styled.button`
  position: absolute;
  left: 18px;

  border: none;
  background: transparent;

  color: #ffa7a7;
  font-size: 22px;

  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 18px;
  font-weight: 700;
`;
