import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import {
  HomePage,
  Dashboard,
  Login,
  ForgotPassword,
  ResetPassword,
  SignUp,
  Verify,
  Error,
} from "./pageRouteLinks";
import { ProtectedRoutes } from "../ProtectedRoute";
export const pageRoutes = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    Component: HomePage,
    children: [
      {
        path: ROUTES.HOMEPAGE,
        Component: Login,
        index: true,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        Component: ForgotPassword,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        Component: ResetPassword,
      },
      {
        path: ROUTES.SIGNUP,
        Component: SignUp,
      },
    ],
  },
  {
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        Component: Dashboard,
      },
    ],
  },
  {
    path: ROUTES.VERIFY,
    Component: Verify,
  },
  {
    path: ROUTES.ERROR,
    Component: Error,
  },
]);
