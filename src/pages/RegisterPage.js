import { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registracija sėkminga!");
      } else {
        setMessage(data.message || "Klaida registruojantis");
      }
    } catch (err) {
      console.error("Klaida:", err);
      setMessage("Serverio klaida");
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Vardas"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="El. paštas"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Slaptažodis"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Registruotis</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
