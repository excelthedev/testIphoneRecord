import { Navigate } from "react-router-dom";
import { ROUTES } from "./utils/routes";
export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (
    // !sessionStorage.getItem(import.meta.env.VITE_APP_USER_INFO) &&
    !sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN)
  ) {
    return <Navigate to={ROUTES.HOMEPAGE} replace />;
  }
  return children;
};
