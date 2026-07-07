import api from "./index";

// POST /invites
export const createInvite = (inviteData) => {
  return api.post("/invites", inviteData);
};

// POST /invites/accept
export const acceptInvite = (acceptData) => {
  return api.post("/invites/accept", acceptData);
};
