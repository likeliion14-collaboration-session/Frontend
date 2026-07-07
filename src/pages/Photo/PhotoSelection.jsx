import { useState, useEffect } from "react"; // 💡 useEffect 추가

const BASE_URL = "https://api.chungs.store";

export default function PhotoSelection() {
  const [userImages, setUserImages] = useState([]); // 백엔드에서 받아올 공간 (빈 배열 시작)
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 사진 ID 배열
  const [isLoading, setIsLoading] = useState(true); // API 로딩 상태 관리

  // 1️⃣ [GET] 카드 후보 사진 목록 조회 API 연결
  useEffect(() => {
    const getCandidateImages = async () => {
      try {
        // 임시로 userId를 1로 설정했습니다. 실제 프로젝트의 로그인 세션이나 전역 상태의 id를 사용하세요.
        const userId = 1;
        const until = new Date().toISOString();

        const response = await fetch(
          `${BASE_URL}/card/candidates?userId=${userId}&until=${until}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("사진 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();

        // 💡 만약 Swagger 응답 배열의 이미지 경로 키가 'url'이 아니라 'imageUrl'이나 'photoPath'라면
        // 하단 렌더링 영역의 img.imageUrl도 그 명칭에 맞춰 변경해 주어야 합니다.
        setUserImages(data);
      } catch (error) {
        console.error("사진 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCandidateImages();
  }, []);

  // 2️⃣ 사진 클릭 토글 핸들러 (그대로 유지)
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

  // 3️⃣ [POST] 카드 확정 발급 (2단계) API 연결
  const handleRegister = async () => {
    if (selectedIds.length === 0) {
      alert("최소 1개 이상의 사진을 선정해주세요.");
      return;
    }

    try {
      // 💡 Swagger 'Request body' 스키마를 열어보고 key 값 구조를 일치시키세요.
      // 만약 껍데기 없는 단순 배열([1, 2, 3]) 형태를 원한다면 body에 바로 selectedIds를 넣어야 합니다.
      const requestBody = {
        photoIds: selectedIds,
      };

      const response = await fetch(`${BASE_URL}/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("카드 발급에 실패했습니다.");
      }

      const result = await response.json();
      alert("카드가 성공적으로 확정 발급되었습니다!");

      // 성공 후 결과 페이지 이동 로직 작성 구역
    } catch (error) {
      console.error("카드 발급 실패:", error);
      alert("등록 중 에러가 발생했습니다.");
    }
  };

  // API 로딩 중 일 때 보여줄 화면
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "#555" }}>
        로딩 중...
      </div>
    );
  }

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
          {userImages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                width: "100%",
                color: "#999",
                padding: "40px 0",
              }}
            >
              선택 가능한 사진 후보가 없습니다.
            </div>
          ) : (
            userImages.map((img) => {
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
                  <img
                    src={img.imageUrl}
                    alt="User Upload"
                    style={styles.photo}
                  />
                </div>
              );
            })
          )}
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
    paddingBottom: "240px", // 💡 하단 카드 높이가 넓어진 만큼 스크롤 여백 확대
    backgroundColor: "#fff",
  },
  imageGrid: {
    display: "table",
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
    border: "3px solid transparent",
    cursor: "pointer",
    margin: "4px",
    transition: "all 0.2s ease",
  },
  imageSelected: {
    border: "3px solid #ff8a93",
    boxShadow: "0 0 8px rgba(255,138,147,0.4)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "280px", // 💡 그라데이션이 더 위로 보이기 위해 전체 영역 확보 높이 업그레이드
    background:
      "linear-gradient(to top, rgba(255,235,235,1) 40%, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)", // 💡 위로 갈수록 투명해지는 그라데이션 비율 조율
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    pointerEvents: "none",
  },
  whiteCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "50px 50px 0 0",
    boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
    padding: "24px 16px 20px 16px",
    textAlign: "center",
    pointerEvents: "auto",
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
