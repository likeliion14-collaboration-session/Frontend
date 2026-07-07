import { useState } from "react";

// 예시 데이터: 나중에 백엔드 API 성공 시 구조에 맞게 대체하시면 됩니다.
const DUMMY_USER_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
  },
];

export default function PhotoSelection() {
  const [userImages, setUserImages] = useState(DUMMY_USER_IMAGES); // 유저 사진 목록
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 사진 ID 배열

  // [백엔드 API 연동 예시]
  /*
  useEffect(() => {
    fetch('/api/user/photos')
      .then(res => res.json())
      .then(data => setUserImages(data))
      .catch(err => console.error(err));
  }, []);
  */

  // 사진 클릭 토글 핸들러
  const handleImageClick = (id) => {
    setSelectedIds((prevIds) => {
      // 이미 선택되어 있다면 제거
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      }

      // 최대 3개까지만 선택 가능하도록 제한
      if (prevIds.length >= 3) {
        alert("최대 3개까지만 선정할 수 있습니다.");
        return prevIds;
      }

      // 새로운 사진 추가
      return [...prevIds, id];
    });
  };

  // 최종 등록 핸들러
  const handleRegister = () => {
    if (selectedIds.length === 0) {
      alert("최소 1개 이상의 사진을 선정해주세요.");
      return;
    }

    // 백엔드로 전송할 최종 선택된 이미지 객체들
    const selectedImages = userImages.filter((img) =>
      selectedIds.includes(img.id),
    );
    console.log("공유 페이지로 보낼 MVP 사진 정보:", selectedImages);
    alert(`${selectedIds.length}개의 사진이 등록되었습니다!`);

    // 이후 라우터를 통해 공유 결과 페이지로 이동 처리 (예: navigate('/share', { state: { selectedImages } }))
  };

  return (
    <div style={styles.container}>
      {/* 상단 헤더 슬롯 */}
      <div style={styles.header}>
        <span style={styles.backArrow}>◀</span>
        <h2 style={styles.headerTitle}>공유하기</h2>
        <div style={{ width: 24 }}></div>
      </div>

      {/* 스크롤 가능한 메인 사진 그리드 영역 */}
      <div style={styles.gridArea}>
        <div style={styles.imageGrid}>
          {userImages.map((img) => {
            const isSelected = selectedIds.includes(img.id);
            return (
              <div
                key={img.id}
                onClick={() => handleImageClick(img.id)}
                style={{
                  ...styles.imageWrapper,
                  ...(isSelected ? styles.imageSelected : {}),
                }}
              >
                <img src={img.url} alt="User Upload" style={styles.photo} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 그라데이션 오버레이 및 MVP 등록 모달 */}
      <div style={styles.bottomOverlay}>
        <div style={styles.whiteCard}>
          <p style={styles.cardTitle}>오늘의 MVP 화면</p>
          <p style={styles.cardSubtitle}>최대 3개를 선정해주세요</p>
          <button onClick={handleRegister} style={styles.submitBtn}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

// UI 흐름 이미지 분석을 기반으로 최적화한 스타일 오브젝트
const styles = {
  container: {
    width: "360px",
    height: "740px",
    border: "1px solid #e0e0e0",
    borderRadius: "24px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    margin: "20px auto",
  },
  header: {
    height: "50px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid #f0f0f0",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  backArrow: { fontSize: "18px", color: "#ff8a93", cursor: "pointer" },
  headerTitle: { fontSize: "16px", fontWeight: "bold", color: "#555" },
  gridArea: {
    flex: 1,
    overflowY: "auto",
    padding: "12px",
    paddingBottom: "180px", // 하단 고정 카드 영역에 가려지지 않도록 패딩 부여
    backgroundColor: "#fff",
  },
  imageGrid: {
    display: "table", // flex/grid 대안으로 안정적인 격자 구조 표현
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "8px",
  },
  imageWrapper: {
    display: "inline-block",
    width: "calc(50% - 8px)",
    aspectRatio: "1 / 1",
    borderRadius: "12px",
    overflow: "hidden",
    boxSizing: "border-box",
    border: "3px solid transparent", // 기본 상태 격자 흔들림 방지
    cursor: "pointer",
    margin: "4px",
    transition: "all 0.2s ease",
  },
  imageSelected: {
    border: "3px solid #ff8a93", // 선택됐을 때 강조되는 피치/핑크 테두리
    boxShadow: "0 0 8px rgba(255,138,147,0.4)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  // 요청사항: "하단바 뒤에 그라데이션 들어갑니다" 구현 영역
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "220px",
    // 하단 투명에서 은은한 피치-화이트톤으로 올라오는 그라데이션 설정

    background:
      "linear-gradient(to top, rgba(255,235,235,1) 60%, rgba(255,255,255,1) 100%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    pointerEvents: "none", // 뒤에 있는 스크롤을 방해하지 않되 내부 카드는 클릭 가능하도록 분리 가능
  },
  whiteCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "50px 50px 0 0", // 요구 서류의 부드러운 둥근 돔 모양 구현
    boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
    padding: "20px 16px 12px 16px",
    textAlign: "center",
    pointerEvents: "auto", // 카드 내부 요소는 클릭 가능하게 제어
  },
  cardTitle: {
    fontSize: "13px",
    color: "#888",
    margin: "0 0 4px 0",
  },
  cardSubtitle: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 16px 0",
  },
  submitBtn: {
    width: "110px",
    padding: "8px 0",
    border: "1px solid #ff8a93",
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "#ff8a93",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(255,138,147,0.2)",
  },
};
