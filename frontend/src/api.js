import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const saveSwappieProfile = (data) => {
  return api.post("/api/swappie/profile", data);
};

export const getSwappieMatches = (uniqueId) => {
  return api.get(`/api/swappie/matches/${uniqueId}`);
};

export const deleteAccount = (uniqueId) => {
  return api.delete(`/api/delete-account/${uniqueId}`);
};
