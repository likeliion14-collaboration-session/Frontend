import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
export default function RootLayout() {
  const location = useLocation();

  const hideFooter = location.pathname === "/photo-upload";

  return (
    <>
      <Header />

      <Main $hideFooter={hideFooter}>
        <Outlet />
      </Main>

      {!hideFooter && <Footer />}
    </>
  );
}

const Main = styled.main`
  padding-top: 52px;
  padding-bottom: ${({ $hideFooter }) => ($hideFooter ? "0px" : "72px")};
`;
