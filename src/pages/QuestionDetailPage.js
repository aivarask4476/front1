import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function QuestionDetailPage() {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Gauti atsakymus
    fetch(`http://localhost:4000/question/${id}/answers`)
      .then((res) => res.json())
      .then(setAnswers);

    // Gauti klausimą (jei nori, gali backend'e padaryti GET /question/:id)
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((q) => q._id === id);
        setQuestion(found);
      });
  }, [id]);

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:4000/question/${id}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setAnswers([data, ...answers]);
    setText("");
  };

  if (!question) return <p>Kraunama klausimo informacija...</p>;

  return (
    <div>
      <h2>Klausimas</h2>
      <p>{question.question_text}</p>

      <h3>Atsakymai</h3>
      {answers.length === 0 ? (
        <p>Nėra atsakymų</p>
      ) : (
        <ul>
          {answers.map((a) => (
            <li key={a._id}>{a.text}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddAnswer}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tavo atsakymas"
          required
        />
        <button type="submit">Atsakyti</button>
      </form>
    </div>
  );
}

export default QuestionDetailPage;
