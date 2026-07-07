import api from "./index";

// GET /health
export const checkHealth = () => {
  return api.get("/health");
};
