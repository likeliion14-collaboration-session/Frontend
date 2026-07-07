import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// (다른 임포트는 생략)
import LoginPage from "./pages/Login/LoginPage.jsx";
import RootLayout from "../src/layout/RootLayout.jsx";
import MainPage from "../src/pages/Home/MainPage.jsx";

function App() {
  // 1. [수정] 처음 렌더링될 때 딱 한 번만 localStorage를 확인해서 초기값으로 박아버림
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("walkordUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 컴포넌트가 처음 마운트될 때 실행 (자동 로그인 확인 등)
  useEffect(() => {
    // 혹시 localStorage 등에 저장된 세션이 있다면 확인하는 로직 (선택 사항)
    const storedUser = localStorage.getItem("walkordUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    // 확인 후 로딩 상태 해제
    // setIsLoading(false);
  }, []);

  // [핵심] 로그인(등록) 버튼을 눌렀을 때 백엔드에 요청을 보내는 함수
  const handleLoginSubmit = async (userId) => {
    try {
      /* 🚨 기존 백엔드 fetch 코드들을 잠시 주석 처리하거나 지우고 아래 3줄만 넣어줘! */

      // 1. 입력한 아이디를 가지고 가짜 유저 데이터를 만듦
      const mockUserData = { name: userId, id: Date.now() };

      // 2. 받아온 사용자 정보를 상태에 저장 (이제 !currentUser 조건이 풀림!)
      setCurrentUser(mockUserData);

      // 3. 테스트 세션 유지를 위해 localStorage에 저장
      localStorage.setItem("walkordUser", JSON.stringify(mockUserData));

      /* ----------------------------------------------------
      // 기존 백엔드 API 요청 코드 (테스트 끝나고 백엔드 붙일 때 다시 살리면 돼!)
      const response = await fetch(`https://our-backend-server.com/api/user/${userId}`);
      if (response.ok) { ... }
      ---------------------------------------------------- */
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  // // 1. 정보를 불러오는 중이라면 로딩 화면을 보여줌
  // if (isLoading) {
  //   return <LoadingScreen />; // 로딩 스피너 컴포넌트
  // }

  // 2. 로그인 안 했으면 로그인 창을 보여주고, 등록 클릭 시 handleLoginSubmit 실행
  if (!currentUser) {
    return <LoginPage onLoginSubmit={handleLoginSubmit} />;
  }

  // 3. 로그인 성공 시 메인 라우터 구조를 보여줌
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
