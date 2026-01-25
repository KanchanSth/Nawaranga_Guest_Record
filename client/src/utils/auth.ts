import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  role: "admin" | "manager" | "user";
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isLoggedIn = (): boolean => {
  const token = getToken(); // ✅ Get fresh token each time
  
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Token decode failed:", err);
    localStorage.removeItem("token");
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getUser = (): { role: string } | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode<{ role: string }>(token);
  } catch {
    return null;
  }
};