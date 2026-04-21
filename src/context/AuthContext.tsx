import type { AuthContextType } from "@/features/auth/auth.types";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);
