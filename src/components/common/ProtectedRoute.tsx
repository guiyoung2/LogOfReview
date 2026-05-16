import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

// 비로그인 시 /login으로 리다이렉트하는 라우트 가드
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
