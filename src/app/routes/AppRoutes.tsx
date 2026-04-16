import LandingPage from "@/features/portfolio/LandingPage";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AuthRoutes from "@/app/routes/AuthRoutes";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Portfolio */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Dashboard */}
      <Route
        // path="/dashboard/*"
        path="/dashboard/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <MainLayout />
          </Suspense>
        }
      />
    </Routes>
  );
}
