import { useAuth } from "@/hooks/useAuth";

const ROLES = ["admin", "landlord", "caretaker", "tenant"] as const;

export const RoleSwitcher = () => {
  const { user, login, logout } = useAuth();

  // Only render in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border border-border rounded-xl shadow-lg p-3 flex flex-col gap-2 text-xs">
      <p className="font-semibold text-muted-foreground">
        DEV — Role Switcher
      </p>
      <p className="text-foreground">
        Current: <span className="font-bold text-primary">{user?.role ?? "logged out"}</span>
      </p>
      <div className="flex gap-1 flex-wrap">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => login(role)}
            className={`px-2 py-1 rounded-md capitalize border transition-colors ${
              user?.role === role
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-muted"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <button
        onClick={logout}
        className="text-destructive hover:underline text-left"
      >
        Log out
      </button>
    </div>
  );
};