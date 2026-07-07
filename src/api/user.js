// src/api/user.js
import api from "./index";

// POST /users/login
// 인자로 JSON 객체가 아닌, FormData 객체를 그대로 전달받도록 구성합니다.
export const login = (formData) => {
  return api.post("/users/login", formData, {
    headers: {
      // 파일 전송을 위한 헤더 설정 (axios가 대부분 자동으로 해주지만 명시하면 안전합니다)
      "Content-Type": "multipart/form-data",
    },
  });
};
