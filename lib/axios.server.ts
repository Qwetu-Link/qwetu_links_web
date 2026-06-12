// lib/axios.server.ts
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

/**
 * Server-side axios instance, authenticated using the
 * auth cookie read via next/headers (Server Components only).
 */
export async function getServerApi(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth-store")?.value;

  let token: string | null = null;

  if (authCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authCookie));
      token = parsed?.state?.token ?? null;
    } catch {
      token = null;
    }
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}