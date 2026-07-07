import api from "./index";

// PATCH /connections/{connectionId}/sharing
export const updateSharingStatus = (connectionId, sharingData) => {
  return api.patch(`/connections/${connectionId}/sharing`, sharingData);
};

// GET /users/{userId}/connections
export const getUserConnections = (userId) => {
  return api.get(`/users/${userId}/connections`);
};
