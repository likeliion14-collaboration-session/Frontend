import { useState, useEffect } from "react";
import styled from "styled-components";
import profile_icon from "../../assets/images/icons/profile_icon.svg";

function LoginPage({ onLoginSubmit }) {
  const [userId, setUserId] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // 모바일 키보드 감지 로직
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 550) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      onLoginSubmit(userId.trim());
    } else {
      alert("사용할 아이디를 입력해주세요.");
    }
  };

  const isHideState = isInputFocused || isKeyboardVisible;

  return (
    <LoginContainer>
      {/* 2. 메인 콘텐츠 컨테이너 (키보드 활성화 시 위로 이동) */}
      <MainContent isFocused={isHideState} onSubmit={handleSubmit}>
        {/* 🌟 디자인의 핵심: 프로필 원과 흰색 카드 박스를 감싸는 그룹 */}
        <CardGroup>
          {/* 프로필 이미지가 카드 상단 정중앙 경계선에 걸치도록 배치 */}
          <ProfileCircle>
            <ProfileIconImage src={profile_icon} alt="프로필 아이콘" />
          </ProfileCircle>

          {/* 모든 입력 요소들이 들어가는 거대한 흰색 박스 카드 */}
          <WhiteCard>
            <InputBox isFocused={isInputFocused}>
              <InputField
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={isInputFocused ? "" : "아이디"}
              />
            </InputBox>
          </WhiteCard>

          {/* 웰컴 문구 */}
          <WelcomeText isHidden={isHideState}>
            walkord 에 오신것을 환영합니다
            <br />
            사용할 아이디와 프로필을 입력해주세요
          </WelcomeText>

          {/* 등록 버튼 */}
          <SubmitButton isVisible={isHideState} type="submit">
            등록
          </SubmitButton>
        </CardGroup>
      </MainContent>

      {/* 3. 하단 로고 */}
      <Footer isHidden={isHideState}>
        <LogoText>walk:rd</LogoText>
      </Footer>
    </LoginContainer>
  );
}

// --- 💅 Styled Components (CSS 스타일링) ---

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  width: 100%;
  max-width: 430px;
  height: 100dvh;
  border-radius: 24px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.12);
`;

const MainContent = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  /* 포커스 시 전체 카드 묶음을 위로 슬라이딩 */
  transform: ${(props) =>
    props.isFocused ? "translateY(-100px)" : "translateY(0)"};
`;

/* 🌟 프로필과 카드를 하나로 묶어 기준점으로 삼는 컴포넌트 */
const CardGroup = styled.div`
  position: relative;
  width: 90%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* 프로필 원이 튀어나올 공간 확보 */
`;

/* 🌟 거대한 흰색 박스 카드 */
const WhiteCard = styled.div`
  width: 100%;

  background-color: #9a9a9a;
  border-radius: 24px;
  padding: 60px 24px 32px 24px; /* 상단 패딩을 크게 주어 프로필 원 영역 확보 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 부드러운 그림자 효과 */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

/* 🌟 상단 경계선에 걸치게 배치하는 프로필 원 */
const ProfileCircle = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(-50%); /* 정확히 y축 기준으로 반만 위로 튀어나오게 함 */
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 5px solid #ffffff; /* 카드 배경과 자연스럽게 이어지도록 흰색 테두리 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* 카드보다 무조건 위에 오도록 설정 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ProfileIconImage = styled.img`
  width: 100%; /* 박스 크기의 절반 정도로 이쁘게 맞춤 (디자인에 따라 60% 등으로 조절 가능) */
  height: auto;
  object-fit: cover;
`;

const InputBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 14px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.isFocused ? "#FF8E8E" : "transparent")};
`;

const InputField = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  outline: none;

  &::placeholder {
    color: #adb5bd;
    font-weight: normal;
  }
`;

const WelcomeText = styled.p`
  font-size: 13px;
  color: #868e96;
  text-align: center;
  line-height: 1.6;
  margin-top: 24px;
  margin-bottom: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s;

  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 0;
  background-color: #ff8e8e;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(255, 142, 142, 0.3);
  transition: all 0.2s ease-in-out;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(10px)"};

  &:active {
    transform: scale(0.98);
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s;

  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: #ff8e8e;
  letter-spacing: -1px;
`;

export default LoginPage;
