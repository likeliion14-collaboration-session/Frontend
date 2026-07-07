import api from "./index";

// POST /records/start
export const startRecord = (recordData) => {
  return api.post("/records/start", recordData);
};

// POST /locations
export const uploadLocation = (locationData) => {
  return api.post("/locations", locationData);
};

// GET /users/live-location
export const getLiveLocation = () => {
  return api.get("/users/live-location");
};

// GET /track-points
export const getTrackPoints = (params) => {
  return api.get("/track-points", { params }); // 쿼리 스트링 대응
};
