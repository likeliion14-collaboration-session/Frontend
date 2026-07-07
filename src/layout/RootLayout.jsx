import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
