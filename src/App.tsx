import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/common/Header";
import NotFoundPage from "./pages/NotFoundPage";
import ClickSpark from "./components/common/ClickEffect";
import { Routes, Route } from "react-router-dom";
import ReviewDetailPage from "./pages/ReviewDetailPage";

function App() {
  return (
    <ClickSpark
      sparkColor="#667eea"
      sparkRadius={20}
      sparkCount={12}
      duration={500}
    >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ClickSpark>
  );
}

export default App;
