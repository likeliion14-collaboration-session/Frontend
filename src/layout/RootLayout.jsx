// RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

export default function RootLayout() {
  const location = useLocation();

  const hideHeader = location.pathname === "/";
  const hideFooter =
    location.pathname === "/" || location.pathname === "/photo-upload";

  return (
    <Layout>
      {!hideHeader && <Header />}

      <Main $hideHeader={hideHeader} $hideFooter={hideFooter}>
        <Outlet />
      </Main>

      {!hideFooter && <Footer />}
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  padding-top: ${({ $hideHeader }) => ($hideHeader ? "0" : "52px")};
  padding-bottom: ${({ $hideFooter }) => ($hideFooter ? "0" : "156px")};
`;
