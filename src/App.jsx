import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// (다른 임포트는 생략)
import LoginPage from "./pages/Login/LoginPage.jsx";

function App() {
  // 사용자가 로그인한 실제 정보를 저장할 상태 (기본값: null)
  const [currentUser, setCurrentUser] = useState(null);
  // 로딩 상태 (API 요청 중임을 표시)
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 처음 마운트될 때 실행 (자동 로그인 확인 등)
  useEffect(() => {
    // 혹시 localStorage 등에 저장된 세션이 있다면 확인하는 로직 (선택 사항)
    const storedUser = localStorage.getItem("walkordUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    // 확인 후 로딩 상태 해제
    setIsLoading(false);
  }, []);

  // [핵심] 로그인(등록) 버튼을 눌렀을 때 백엔드에 요청을 보내는 함수
  const handleLoginSubmit = async (userId) => {
    setIsLoading(true); // 로딩 시작

    try {
      // 1. 백엔드 API에 사용자가 입력한 userId로 정보를 요청 (GET)
      const response = await fetch(
        `https://our-backend-server.com/api/user/${userId}`, // 추후에 제대로 입력해야 함
      );

      // 2. 응답 결과 확인
      if (response.ok) {
        // 3. 백엔드에 아이디가 존재하여 성공적으로 정보를 받아옴
        const userData = await response.json(); // 백엔드가 돌려준 JSON 데이터 파싱

        // 4. 받아온 사용자 정보를 상태에 저장
        setCurrentUser(userData); // 이제 currentUser에는 백엔드 정보가 들어감

        // 5. (선택 사항) 세션을 유지하기 위해 localStorage에 저장
        localStorage.setItem("walkordUser", JSON.stringify(userData));
      } else {
        // 3. 백엔드에 아이디가 없거나 에러가 발생함 (예: 404, 500)
        console.error("백엔드에서 사용자 정보를 찾을 수 없습니다.");
        alert("존재하지 않는 아이디입니다.");
        setCurrentUser(null); // 로그인 실패
      }
    } catch (error) {
      console.error("백엔드 서버와 통신 중 에러가 발생했습니다.", error);
      alert("서버와 연결이 원활하지 않습니다. 다시 시도해주세요.");
      setCurrentUser(null);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 1. 정보를 불러오는 중이라면 로딩 화면을 보여줌
  if (isLoading) {
    return <LoadingScreen />; // 로딩 스피너 컴포넌트
  }

  // 2. 로그인 안 했으면 로그인 창을 보여주고, 등록 클릭 시 handleLoginSubmit 실행
  if (!currentUser) {
    return <LoginPage onLoginSubmit={handleLoginSubmit} />;
  }

  // 3. 로그인 성공 시 메인 라우터 구조를 보여줌
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Main 컴포넌트에 백엔드에서 받아온 userData를 통째로 넘겨줌 */}
          <Route path="/" element={<Main currentUser={currentUser} />} />
          {/* ...다른 라우트 생략... */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
