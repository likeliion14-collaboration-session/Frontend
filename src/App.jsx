// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import RootLayout from "./layout/RootLayout.jsx";
import PhotoUpload from "./pages/Photo/PhotoUpload.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import MainPage from "./pages/Home/MainPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppFrame>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/photo-upload" element={<PhotoUpload />} />
          </Route>
        </Routes>
      </AppFrame>
    </BrowserRouter>
  );
}

export default App;

const AppFrame = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
  position: relative;
  overflow-x: hidden;
`;
