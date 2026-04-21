// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router";

// export default function LoginForm() {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string>
//   >({});

//   const validateForm = (): boolean => {
//     const errors: Record<string, string> = {};

//     if (!identifier.trim()) errors.identifier = "Email or phone is required";
//     if (!password.trim()) errors.password = "Password is required";

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;
//     navigate("/dashboard/");

//     // Handle login logic
//   };
//   return (
//     <div className="flex min-h-screen items-center justify-center px-4">
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
//       </div>

//       <div className="relative z-10 w-full max-w-sm space-y-8">
//         <div className="space-y-2 text-center">
//           <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
//             Welcome back
//           </h1>
//           <p className="text-sm text-muted-foreground">Sign in to continue</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="identifier"
//                 className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
//               >
//                 Email or Phone
//               </label>
//               <div
//                 className={`${
//                   validationErrors.identifier
//                     ? "border-error bg-error/5 dark:bg-error/10"
//                     : "border-border"
//                 }`}
//               >
//                 <Input
//                   id="identifier"
//                   type="text"
//                   placeholder="you@example.com"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   aria-invalid={!!validationErrors.identifier}
//                 />
//               </div>
//               {validationErrors.identifier && (
//                 <p className="text-error text-sm mt-1">
//                   {validationErrors.identifier}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="password"
//                 className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
//               >
//                 Password
//               </label>
//               <div
//                 className={` ${
//                   validationErrors.password
//                     ? "border-error bg-error/5 dark:bg-error/10"
//                     : "border-border"
//                 }`}
//               >
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   aria-invalid={!!validationErrors.password}
//                   className="pr-11"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {validationErrors.password && (
//                 <p className="text-error text-sm mt-1">
//                   {validationErrors.password}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="text-xs text-muted-foreground hover:text-primary transition-colors"
//             >
//               Forgot password?
//             </button>
//           </div>

//           <Button
//             type="submit"
//             size="lg"
//             className="w-full h-12 text-sm font-semibold tracking-wide"
//           >
//             Sign In
//           </Button>
//         </form>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-border" />
//           </div>
//           <div className="relative flex justify-center">
//             <span className="bg-background px-4 text-xs text-muted-foreground">
//               or
//             </span>
//           </div>
//         </div>

//         <p className="text-center text-sm text-muted-foreground">
//           Don't have an account?{" "}
//           <button
//             type="button"
//             className="text-primary hover:text-primary/80 font-medium transition-colors"
//           >
//             Create one
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

type Role = "admin" | "landlord" | "caretaker" | "tenant";

const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "admin",     label: "Admin",     description: "Full system access" },
  { value: "landlord",  label: "Landlord",  description: "Manage properties & tenants" },
  { value: "caretaker", label: "Caretaker", description: "Units & maintenance" },
  { value: "tenant",    label: "Tenant",    description: "My unit & payments" },
];

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("tenant");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!identifier.trim()) errors.identifier = "Email or phone is required";
    if (!password.trim()) errors.password = "Password is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate login by setting the selected role
    login(selectedRole);
    navigate("/dashboard/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">

            {/* ── Role Selector ── */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      selectedRole === role.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-medium">{role.label}</span>
                    <span className="text-[11px] mt-0.5 opacity-70">{role.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Identifier ── */}
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                Email or Phone
              </label>
              <Input
                id="identifier"
                type="text"
                placeholder="you@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                aria-invalid={!!validationErrors.identifier}
                className={validationErrors.identifier ? "border-destructive" : ""}
              />
              {validationErrors.identifier && (
                <p className="text-destructive text-sm">{validationErrors.identifier}</p>
              )}
            </div>

            {/* ── Password ── */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!validationErrors.password}
                  className={`pr-11 ${validationErrors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-destructive text-sm">{validationErrors.password}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-sm font-semibold tracking-wide"
          >
            Sign in as {ROLES.find((r) => r.value === selectedRole)?.label}
          </Button>
        </form>

        {/* ── Dev hint ── */}
        {import.meta.env.DEV && (
          <p className="text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg py-2">
            🧪 Dev mode — any credentials work, role is simulated
          </p>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-xs text-muted-foreground">or</span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}