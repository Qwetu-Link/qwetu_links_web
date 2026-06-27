import { Suspense } from "react";
import AuthImagePanel from "../_components/AuthImagePanel";
import AuthMobileHeader from "../_components/AuthMobileHeader";
import ResetPasswordForm from "../form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="h-dvh overflow-hidden bg-rental-bg-light">
      <div className="grid h-full md:grid-cols-[58%_42%]">
        <div className="h-dvh overflow-y-auto px-4 py-6 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto flex min-h-full max-w-xl items-center">
            <div className="w-full">
              <AuthMobileHeader />
              <Suspense>
                <ResetPasswordForm />
              </Suspense>
            </div>
          </div>
        </div>

        <AuthImagePanel
          imageIndex={0}
          title="Create a secure new password"
          text="Use the 6-digit code sent to your email to confirm the reset and protect your account."
          linkText="Back to sign in?"
          linkHref="/login"
          linkLabel="Log in"
        />
      </div>
    </main>
  );
}
