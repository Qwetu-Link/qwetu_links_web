import LandingPage from "@/features/portfolio/LandingPage";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import AuthRoutes from "@/app/routes/AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoutes";
import NotFound from "@/components/NotFound";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Portfolio */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<MainLayout />}>
          <Route path="*" element={<DashboardRoutes />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
