// import { useState, useEffect } from "react";
// import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
// import styled from "styled-components";
// import profile_icon from "../../assets/images/icons/profile_icon.svg";

// function MainPage({ currentUser }) {
//   // 🚨 [핵심 추가] 카카오 맵 스크립트가 로드되었는지 확인하는 상태
//   const [isMapLoaded, setIsMapLoaded] = useState(false);

//   const [myLocation, setMyLocation] = useState({ lat: 37.5665, lng: 126.978 });
//   const [pathCoordinates, setPathCoordinates] = useState([]);

//   // 스크립트 로드 여부 체크 및 실시간 GPS
//   useEffect(() => {
//     // 1. window.kakao 객체가 존재할 때까지 반복 체크
//     const checkMapLoaded = setInterval(() => {
//       if (window.kakao && window.kakao.maps) {
//         setIsMapLoaded(true);
//         clearInterval(checkMapLoaded);
//       }
//     }, 100);

//     // 2. 실시간 GPS 위치 추적
//     let watchId;
//     if (navigator.geolocation) {
//       watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const newLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setMyLocation(newLocation);
//           setPathCoordinates((prevPath) => [...prevPath, newLocation]);
//         },
//         (error) => {
//           console.error("위치 정보 실패:", error);
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
//       );
//     }

//     return () => {
//       clearInterval(checkMapLoaded);
//       if (watchId) navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return (
//     <MainContainer>
//       <TopStatusBar>
//         <UserName>{currentUser?.name || "SKUNIV"}</UserName>
//       </TopStatusBar>

//       {/* 🗺️ 1. 지도 영역 */}
//       <MapContainer>
//         {/* 🚨 카카오 맵이 로드되었을 때만 Map 컴포넌트를 렌더링하도록 차단 */}
//         {isMapLoaded ? (
//           <Map
//             center={myLocation}
//             style={{ width: "100%", height: "100%" }}
//             level={3}
//           >
//             <MapMarker position={myLocation} />
//             <Polyline
//               path={pathCoordinates}
//               strokeWeight={5}
//               strokeColor="#FF8E8E"
//               strokeOpacity={0.8}
//               strokeStyle="solid"
//             />
//           </Map>
//         ) : (
//           // 지도가 로드되기 전 보여줄 임시 로딩창 (레이아웃 무너짐 방지)
//           <MapLoadingText>지도를 로드하고 있습니다...</MapLoadingText>
//         )}
//       </MapContainer>

//       {/* 📱 2. 하단 플로팅 푸터 영역 */}
//       <FloatingFooter>
//         <NavButton>
//           <ButtonIcon>👥</ButtonIcon>
//           <ButtonLabel>FRIENDS</ButtonLabel>
//         </NavButton>

//         <CenterPowerButton>
//           <PowerIcon viewBox="0 0 24 24">
//             <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
//           </PowerIcon>
//         </CenterPowerButton>

//         <NavButton>
//           <ButtonIcon>📐</ButtonIcon>
//           <ButtonLabel>SHARE</ButtonLabel>
//         </NavButton>
//       </FloatingFooter>
//     </MainContainer>
//   );
// }

// // --- 💅 Styled Components ---

// const MainContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   position: relative;
//   overflow: hidden;
//   background-color: #ffffff;
// `;

// const TopStatusBar = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 60px;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(4px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 10;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
// `;

// const UserName = styled.span`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333333;
// `;

// const MapContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 1;
// `;

// // 로딩 텍스트 스타일 추가
// const MapLoadingText = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f5f5f5;
//   color: #888888;
//   font-weight: bold;
// `;

// const FloatingFooter = styled.footer`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 110px;
//   z-index: 10;
//   display: flex;
//   justify-content: space-around;
//   align-items: flex-end;
//   padding-bottom: 24px;
//   box-sizing: border-box;
//   background: transparent;
//   pointer-events: none;
// `;

// const NavButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background: #ffffff;
//   border: none;
//   width: 80px;
//   height: 65px;
//   border-radius: 20px;
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   pointer-events: auto;
//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const ButtonIcon = styled.span`
//   font-size: 20px;
//   margin-bottom: 4px;
// `;

// const ButtonLabel = styled.span`
//   font-size: 10px;
//   font-weight: bold;
//   color: #ff8e8e;
// `;

// const CenterPowerButton = styled.button`
//   width: 76px;
//   height: 76px;
//   border-radius: 50%;
//   background-color: #ff8e8e;
//   border: 5px solid #ffffff;
//   box-shadow: 0 8px 25px rgba(255, 142, 142, 0.5);
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   pointer-events: auto;
//   transform: translateY(-10px);
//   transition: all 0.1s ease-in-out;
//   &:active {
//     transform: translateY(-10px) scale(0.93);
//     box-shadow: 0 4px 15px rgba(255, 142, 142, 0.3);
//   }
// `;

// const PowerIcon = styled.svg`
//   width: 32px;
//   height: 32px;
//   fill: #ffffff;
// `;

// export default MainPage;

import styled from "styled-components";
import main_start from "../../assets/images/main_start.png";

// 1. 스타일 컴포넌트 정의 (백틱 내부 문법 및 괄호 체크 완료)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const PhoneWrapper = styled.div`
  position: relative;
  width: 360px;
  height: 780px;
  background-image: url(${main_start}); /* 경로 설정 괄호 확인 */
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const MapArea = styled.div`
  position: absolute;
  top: 10%;
  bottom: 12%;
  left: 0;
  right: 0;
`;

const PinWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
`;

// 2. 임시 핀 컴포넌트 (내부 style 객체의 괄호 및 중괄호 정렬)
const UserPin = () => (
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#ff8a8a",
      border: "3px solid #fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: "12px",
    }}
  >
    👤
  </div>
);

const SakuraPin = () => (
  <div
    style={{
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: "2px solid #ffb7b7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
    }}
  >
    🌸
  </div>
);

const StarPin = () => (
  <div
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: "2px solid #ffa1a1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
    }}
  >
    ⭐
  </div>
);

const PalacePin = () => (
  <div
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: "2px solid #ffa1a1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
    }}
  >
    🏛️
  </div>
);

// 3. 메인 페이지 컴포넌트
const MainPage = () => {
  const pinsData = [
    { id: "user", x: 63, y: 19, component: <UserPin /> },
    { id: "sakura", x: 58, y: 41, component: <SakuraPin /> },
    { id: "star", x: 38, y: 50, component: <StarPin /> },
    { id: "palace", x: 49, y: 66, component: <PalacePin /> },
  ];

  return (
    <Container>
      <PhoneWrapper>
        <MapArea>
          {pinsData.map((pin) => (
            <PinWrapper key={pin.id} x={pin.x} y={pin.y}>
              {pin.component}
            </PinWrapper>
          ))}
        </MapArea>
      </PhoneWrapper>
    </Container>
  );
};

export default MainPage;
