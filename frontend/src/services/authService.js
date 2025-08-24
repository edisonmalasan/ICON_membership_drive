import axios from "axios";

const API_URL = "http://localhost:3000/api/v2";

export async function login(email, password) {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token); // save token
  }
  return res.data;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}
