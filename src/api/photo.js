import api from "./index";

// POST /photos
export const uploadPhoto = (photoData) => {
  // 만약 이미지 파일 전송이라면 FormData 형식을 사용해야 할 수 있습니다.
  return api.post("/photos", photoData);
};

// GET /photos/{photoId}
export const getPhotoById = (photoId) => {
  return api.get(`/photos/${photoId}`);
};

// DELETE /photos/{photoId}
export const deletePhoto = (photoId) => {
  return api.delete(`/photos/${photoId}`);
};

// PATCH /photos/{photoId}
export const updatePhoto = (photoId, photoData) => {
  return api.patch(`/photos/${photoId}`, photoData);
};

// GET /photos/pins
export const getPhotoPins = () => {
  return api.get("/photos/pins");
};
