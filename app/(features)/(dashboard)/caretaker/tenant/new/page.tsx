"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import TenantFormPage from "@/features/forms/TenantFormPage";

export default function Page() {
  const user = useAuthStore((state) => state.user);

  if (!user?.businessID) {
    return (
      <div className="flex items-center justify-center py-20">
        Business information not found
      </div>
    );
  }

  return <TenantFormPage mode="add" businessId={user.businessID} listHref="/caretaker/tenant" />;
}
