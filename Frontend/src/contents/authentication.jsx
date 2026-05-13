import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/user"
});

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate(); // renamed for clarity

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password
      });

      if (request.status === 201) {
        return request.data.messages; // keep as it is (based on your backend)
      }

    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password
      });

      if (request.status === 200) {
        localStorage.setItem("token", request.data.token);
        navigate("/home"); // fixed naming only
      }

    } catch (error) {
      throw error;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};