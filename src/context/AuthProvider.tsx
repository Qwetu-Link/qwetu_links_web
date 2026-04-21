import { FAKE_USERS } from "@/data/auth.data";
import type { Role, User } from "@/features/auth/auth.types";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(FAKE_USERS.admin);

  const login = (role: Role) => setUser(FAKE_USERS[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
