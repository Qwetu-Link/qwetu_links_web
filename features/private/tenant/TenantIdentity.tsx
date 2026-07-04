"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Tenant } from "@/types/tenant.definations";

type TenantIdentityProps = {
  tenant: Tenant;
};

export default function TenantIdentity({ tenant }: TenantIdentityProps) {
  const [imageError, setImageError] = useState(false);

  const fullName = tenant.user.name ?? "";

  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [fullName]);

  const avatarUrl = useMemo(() => {
    if (!tenant.user.avatarPath) return null;

    const path = tenant.user.avatarPath.trim();

    if (!path) return null;

    // Already a full URL
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    // Public folder image
    if (path.startsWith("/")) {
      return path;
    }

    // Laravel storage path
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) return null;

    return `${baseUrl.replace(/\/$/, "")}/storage/${path.replace(/^storage\//, "")}`;
  }, [tenant.user.avatarPath]);

  return (
    <div className="flex min-w-0 items-center gap-3">
      {avatarUrl && !imageError ? (
        <Image
          src={avatarUrl}
          alt={fullName}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-base font-semibold text-white shadow-sm">
          {initials || "?"}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900">
          {fullName}
        </h3>

        <p className="truncate text-xs text-slate-500">
          @{tenant.user.username}
        </p>
      </div>
    </div>
  );
}