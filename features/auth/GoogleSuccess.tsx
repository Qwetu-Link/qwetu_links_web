"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const requiresBusinessSetup = searchParams.get("requires_business_setup");

    if (!token) return;

    localStorage.setItem("token", token);

    if (requiresBusinessSetup === "true") {
      router.replace("/business/setup");
    } else {
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  return <p>Signing you in...</p>;
}