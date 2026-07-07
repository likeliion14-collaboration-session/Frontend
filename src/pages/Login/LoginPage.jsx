import { useState, useEffect } from "react";
import styled from "styled-components";

function LoginPage({ onLoginSubmit }) {
  const [userId, setUserId] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // 모바일 브라우저 창 크기 변화로 키보드가 올라왔는지 감지하는 로직
  useEffect(() => {
    const handleResize = () => {
      // 처음 켰을 때의 화면 높이보다 100px 이상 줄어들면 키보드가 켜진 것으로 판단
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
    e.preventDefault(); // form 제출 시 페이지 새로고침 방지
    if (userId.trim()) {
      // App.jsx에서 내려준 백엔드 연동 함수 실행
      onLoginSubmit(userId.trim());
    } else {
      alert("사용할 아이디를 입력해주세요.");
    }
  };

  // 인풋 클릭 시(포커스)와 모바일 키보드가 올라왔을 때 모두 "사라짐" 상태로 트리거
  const isHideState = isInputFocused || isKeyboardVisible;

  return (
    <LoginContainer>
      {/* 1. 상단 상태바 디자인 (디자인 참고용 고정값) */}
      <Header>
        <Time>8:04</Time>
        <StatusIcons>
          <span>5G</span>
          <span>80</span>
        </StatusIcons>
      </Header>

      {/* 2. 메인 콘텐츠 (포커스 시 위로 슥 올라감) */}
      <MainContent isFocused={isHideState} onSubmit={handleSubmit}>
        {/* 프로필 이미지 영역 */}
        <ProfileCircle>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#D9D9D9">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </ProfileCircle>

        {/* 아이디 입력 박스 */}
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

        {/* 웰컴 문구 (포커스 시 부드럽게 사라짐) */}
        <WelcomeText isHidden={isHideState}>
          walkord 에 오신것을 환영합니다
          <br />
          사용할 아이디와 프로필을 입력해주세요
        </WelcomeText>

        {/* 등록 버튼 (포커스 시 부드럽게 나타남) */}
        <SubmitButton isVisible={isHideState} type="submit">
          등록
        </SubmitButton>
      </MainContent>

      {/* 3. 하단 로고 (포커스 시 부드럽게 사라짐) */}
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
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: bold;
`;

const Time = styled.span``;
const StatusIcons = styled.div`
  display: flex;
  gap: 6px;
`;

const MainContent = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  /* 인풋 창을 누르면 전체 콘텐츠를 위로 80px 올림 (키보드에 가려지지 않게) */
  transform: ${(props) =>
    props.isFocused ? "translateY(-60px)" : "translateY(0)"};
`;

const ProfileCircle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #ffe3e3; /* 피그마에 나온 연분홍색 톤 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const InputBox = styled.div`
  width: 85%;
  max-width: 320px;
  background-color: #efefef; /* 피그마 회색 박스 */
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
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
    color: #a9a9a9;
    font-weight: normal;
  }
`;

const WelcomeText = styled.p`
  font-size: 14px;
  color: #8e8e8e;
  text-align: center;
  line-height: 1.6;
  margin-top: 32px;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s;

  /* 숨김 상태일 때 투명하게 만들고 클릭 안 되게 막음 */
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 12px 0;
  background-color: white;
  color: #ff8e8e;
  border: 1px solid #ff8e8e;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;

  /* 숨김 상태일 때는 투명하고 아래에 배치, 활성화되면 나타남 */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(10px)"};

  &:hover {
    background-color: #ff8e8e;
    color: white;
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
  color: #ff8e8e; /* 하단 로고 색상 */
  letter-spacing: -1px;
`;

export default LoginPage;
