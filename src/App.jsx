import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Main from "./pages/Main/Main";
import PhotoUpload from "./pages/PhotoUpload/PhotoUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
