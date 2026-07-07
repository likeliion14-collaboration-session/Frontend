import { useState, useEffect } from "react";
import styled from "styled-components";
import profile_icon from "../../assets/images/icons/profile_icon.svg";
// 1. ⚠️ API 함수 임포트 추가 (프로젝트 구조에 맞게 경로를 확인하세요)
import { login } from "../../api/user";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/Button/CommonButton";

function LoginPage({ onLoginSubmit }) {
  const [userId, setUserId] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const navigate = useNavigate();

  // 2. 🌟 에러 원인 해결: 로딩 상태 선언 추가!
  const [isLoading, setIsLoading] = useState(false);

  // 모바일 키보드 감지 로직
  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardVisible(window.innerHeight < 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedId = userId.trim();
    if (!trimmedId) {
      alert("사용할 아이디를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true); // 이제 정상적으로 작동합니다.

      // 서버 사양(multipart/form-data)에 맞게 FormData 객체 생성
      const formData = new FormData();
      formData.append("nickname", trimmedId);

      // API 요청 전송
      const response = await login(formData);

      console.log("로그인 성공 응답:", response.data);

      if (onLoginSubmit) {
        onLoginSubmit(trimmedId, response.data.data);
      }

      navigate("../src/pages/Home/MainPage.jsx");
    } catch (error) {
      console.error("로그인 통신 에러:", error);
      const errorMessage =
        error.response?.data?.message || "로그인 중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }

    onLoginSubmit?.(userId.trim());
  };

  const isHideState = isInputFocused || isKeyboardVisible;
  const isButtonVisible = userId.trim().length > 0;

  return (
    <LoginContainer>
      {/* 메인 콘텐츠 컨테이너 */}
      <MainContent isFocused={isHideState} onSubmit={handleSubmit}>
        <CardGroup>
          {/* 프로필 이미지 */}
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
                disabled={isLoading} // 3. 로딩 중에는 입력창 비활성화
              />
            </InputBox>
          </WhiteCard>

          <WelcomeText isHidden={isHideState}>
            walkord 에 오신 것을 환영합니다.
            <br />
            사용할 아이디와 프로필을 입력해주세요.
          </WelcomeText>

          {/* 등록 버튼 */}
          <CommonButton
            isVisible={isHideState}
            type="submit"
            disabled={isLoading} // 4. 로딩 중에는 버튼 클릭 방지
          >
            {isLoading ? "등록 중..." : "등록"}
          </CommonButton>
        </CardGroup>
      </MainContent>

      {/* 하단 로고 */}
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
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isFocused ? "translateY(-100px)" : "translateY(0)"};
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
  background-color: #9a9a9a;
  border-radius: 24px;
  padding: 60px 24px 32px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
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
  background-color: #ffffff;
  border: 5px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  z-index: 2;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProfileIconImage = styled.img`
  width: 100%;
  height: auto;
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
