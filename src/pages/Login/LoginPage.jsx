import { useState, useEffect } from "react";
import styled from "styled-components";
import profile_icon from "../../assets/images/icons/profile_icon.svg";
import CommonButton from "../../components/Button/CommonButton";

function LoginPage({ onLoginSubmit }) {
  const [userId, setUserId] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardVisible(window.innerHeight < 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      alert("사용할 아이디를 입력해주세요.");
      return;
    }

    onLoginSubmit?.(userId.trim());
  };

  const isHideState = isInputFocused || isKeyboardVisible;
  const isButtonVisible = userId.trim().length > 0;

  return (
    <LoginContainer>
      <MainContent onSubmit={handleSubmit} isFocused={isHideState}>
        <CardGroup>
          <ProfileCircle>
            <ProfileIconImage src={profile_icon} alt="프로필" />
          </ProfileCircle>

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

          <WelcomeText isHidden={isHideState}>
            walkord 에 오신 것을 환영합니다.
            <br />
            사용할 아이디와 프로필을 입력해주세요.
          </WelcomeText>

          {isButtonVisible && (
            <ButtonWrapper>
              <CommonButton type="submit">등록</CommonButton>
            </ButtonWrapper>
          )}
        </CardGroup>
      </MainContent>

      <Footer isHidden={isHideState}>
        <LogoText>walk:rd</LogoText>
      </Footer>
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  width: 100%;
  height: 100dvh;
  background: #fff;
`;

const MainContent = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  transition: transform 0.3s ease;

  transform: ${({ isFocused }) =>
    isFocused ? "translateY(-100px)" : "translateY(0)"};
`;

const CardGroup = styled.div`
  width: 90%;
  max-width: 340px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  margin-top: 60px;
`;

const WhiteCard = styled.div`
  width: 100%;

  background: #9a9a9a;
  border-radius: 24px;

  padding: 60px 24px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const ProfileCircle = styled.div`
  position: absolute;
  top: 0;

  transform: translateY(-50%);

  width: 110px;
  height: 110px;

  border-radius: 50%;
  background: white;

  border: 5px solid white;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  z-index: 2;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProfileIconImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const InputBox = styled.div`
  width: 100%;

  padding: 14px;
  margin-top: 15px;

  border-radius: 14px;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid
    ${({ isFocused }) => (isFocused ? "#FF8E8E" : "transparent")};

  transition: 0.2s;
`;

const InputField = styled.input`
  width: 100%;

  border: none;
  outline: none;
  background: transparent;

  font-size: 18px;
  font-weight: bold;
  text-align: center;

  &::placeholder {
    color: #adb5bd;
    font-weight: normal;
  }
`;

const WelcomeText = styled.p`
  margin-top: 24px;

  text-align: center;
  line-height: 1.6;
  font-size: 13px;
  color: #868e96;

  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};

  transition: 0.2s;
`;

const ButtonWrapper = styled.div`
  margin-top: 28px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 30px;

  width: 100%;

  display: flex;
  justify-content: center;

  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};

  transition: 0.2s;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: #ff8e8e;
  letter-spacing: -1px;
`;
