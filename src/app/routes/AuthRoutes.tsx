import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/features/auth/pages/LoginForm";
import RegisterForm from "@/features/auth/pages/RegisterForm";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
    </Routes>
  );
}
