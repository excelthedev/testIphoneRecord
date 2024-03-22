import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Homepage/Homepage"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Homepage/Components/Login"));
const ForgotPassword = lazy( () => import("../pages/Homepage/Components/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Homepage/Components/ResetPassword"));
const SignUp = lazy(() => import("../pages/Homepage/Components/SignUp"));
const Verify = lazy(() => import("../pages/Homepage/Components/Verify"));
const Error = lazy(() => import("../pages/Homepage/Components/Error"));
export { HomePage, Dashboard, Login, ForgotPassword, ResetPassword, SignUp,Verify,Error };
