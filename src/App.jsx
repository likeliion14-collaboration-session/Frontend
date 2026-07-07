import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import RootLayout from "./layouts/RootLayout";

import Main from "./pages/Main/Main";
import PhotoUpload from "./pages/PhotoUpload/PhotoUpload";
=======
import LoginPage from "./pages/Login/LoginPage.jsx";
import RootLayout from "../src/layout/RootLayout.jsx";
import MainPage from "../src/pages/Home/MainPage.jsx";
>>>>>>> cf1bf91a418b5cc950346354302e1244e7ccc392

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
<<<<<<< HEAD
          <Route path="/" element={<Main />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
=======
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
>>>>>>> cf1bf91a418b5cc950346354302e1244e7ccc392
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
