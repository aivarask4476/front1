import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/questions" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <QuestionsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/question/:id"
          element={
            <PrivateRoute>
              <QuestionDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
