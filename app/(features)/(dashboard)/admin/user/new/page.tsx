"use client";

import { useAuthStore } from "@/app/stores/useAuthStore";
import StaffFormPage from "../_components/StaffFormPage";

export default function Page() {
  const user = useAuthStore((state) => state.user);

  if (!user?.businessID) {
    return (
      <div className="flex items-center justify-center py-20">
        Business information not found
      </div>
    );
  }

  return <StaffFormPage mode="add" businessId={user.businessID} listHref="/admin/user" />;
}
