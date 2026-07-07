import api from "./index";

// POST /card
export const createCard = (cardData) => {
  return api.post("/card", cardData);
};

// GET /card/candidates
export const getCardCandidates = () => {
  return api.get("/card/candidates");
};
