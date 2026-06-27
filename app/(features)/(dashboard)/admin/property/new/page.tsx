"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import PropertyFormPage from "../_component/PropertyFormPage";

export default function Page() {
  const user = useAuthStore((state) => state.user);

  if (!user?.businessID) {
    return (
      <div className="flex items-center justify-center py-20">
        Business information not found
      </div>
    );
  }

  return <PropertyFormPage businessId={user.businessID} mode="add" />;
}
