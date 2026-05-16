// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query 클라이언트 — 캐시 전략 명시
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 정적 데이터 특성 상 5분간 fresh로 간주해 불필요한 재요청 방지
      staleTime: 5 * 60 * 1000,
      // stale 후에도 10분간 캐시 보관 (페이지 재방문 시 즉시 표시)
      gcTime: 10 * 60 * 1000,
      // 탭 포커스 시 재요청 불필요 — mutation 후 invalidateQueries로 갱신
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
