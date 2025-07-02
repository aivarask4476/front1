import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import api from "../services/api";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login"); // redirect jeigu neprisijungęs

    api
      .get("/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/questions", { question_text: newQuestion });
      setQuestions([res.data, ...questions]);
      setNewQuestion("");
    } catch (err) {
      alert(err.response?.data?.message || "Klaida pridedant klausimą");
    }
  };

  if (loading) return <p>Kraunama...</p>;

  return (
    <div>
      <h2>Klausimų sąrašas</h2>

      <form onSubmit={handleAddQuestion}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Naujas klausimas"
          required
        />
        <button type="submit">Pridėti</button>
      </form>

      <button onClick={logout}>Atsijungti</button>

      {questions.length === 0 ? (
        <p>Nėra klausimų</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q._id}>
              <Link to={`/question/${q._id}`}>{q.question_text}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionsPage;
