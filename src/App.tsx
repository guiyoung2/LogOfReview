import "./App.css";
import { lazy, Suspense } from "react";
import Header from "./components/common/Header";
import ClickSpark from "./components/common/ClickEffect";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

// 페이지별 코드 스플리팅 — 초기 번들 크기 및 TBT 개선
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ReviewWritePage = lazy(() => import("./pages/ReviewWritePage"));
const EditReviewPage = lazy(() => import("./pages/EditReviewPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ReviewDetailPage = lazy(() => import("./pages/ReviewDetailPage"));
function App() {
  return (
    <ClickSpark
      sparkColor="#667eea"
      sparkRadius={20}
      sparkCount={12}
      duration={500}
    >
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/new" element={<ProtectedRoute><ReviewWritePage /></ProtectedRoute>} />
          <Route path="/reviews/:id" element={<ReviewDetailPage />} />
          <Route path="/reviews/:id/edit" element={<ProtectedRoute><EditReviewPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ClickSpark>
  );
}

export default App;
