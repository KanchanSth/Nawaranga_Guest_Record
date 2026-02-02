import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const useAutoLogout = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return; 

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const expiryTime = decoded.exp * 1000 - Date.now();

      if (expiryTime <= 0) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }, expiryTime);

      return () => clearTimeout(timer);
    } catch (err) {
      localStorage.removeItem("token");
    }
  }, []);
};

export default useAutoLogout;
