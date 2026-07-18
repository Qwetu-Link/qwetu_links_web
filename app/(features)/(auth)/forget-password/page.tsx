import AuthImagePanel from "@/features/auth/AuthImagePanel";
import AuthMobileHeader from "@/features/auth/AuthMobileHeader";
import ForgotPasswordForm from "@/features/forms/ForgetPassForm";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Recover Password | Qwetu Links",
  description:
    "Recover access to your Qwetu Links account and continue managing rental property activity.",
  path: "/forget-password",
  index: false,
});

export default function ForgotPasswordPage() {
  return (
    <main className="h-dvh overflow-hidden bg-rental-bg-light">
      <div className="grid h-full md:grid-cols-[42%_58%]">
        <AuthImagePanel
          imageIndex={3}
          title="Recover your Qwetu Links account"
          text="Enter your account email and we will send instructions to help you reset your password."
          linkText="Remember your password?"
          linkHref="/login"
          linkLabel="Log in"
        />

        <div className="h-dvh overflow-y-auto px-4 py-6 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto flex min-h-full max-w-xl items-center">
            <div className="w-full">
              <AuthMobileHeader />
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
