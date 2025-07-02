import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import api from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data); // saugo user ir token
      setMessage("Prisijungimas sėkmingas!");

      // ✅ Perkelia į /questions po prisijungimo
      navigate("/questions");
    } catch (err) {
      setMessage(err.response?.data?.message || "Serverio klaida");
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Prisijungti</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
