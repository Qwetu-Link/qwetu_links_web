"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMaintenanceForRole } from "@/app/lib/roles";
import { useAuthStore } from "@/app/stores/useAuthStore";

type MaintenanceRedirectProps = {
  suffix?: string;
};

export default function MaintenanceRedirect({
  suffix = "",
}: MaintenanceRedirectProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    router.replace(`${getMaintenanceForRole(user.userType)}${suffix}`);
  }, [router, suffix, user]);

  return null;
}
