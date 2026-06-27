import { Suspense } from "react";
import AuthImagePanel from "@/features/auth/AuthImagePanel";
import AuthMobileHeader from "@/features/auth/AuthMobileHeader";
import VerifyEmailForm from "@/features/forms/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <main className="h-dvh overflow-hidden bg-rental-bg-light">
      <div className="grid h-full md:grid-cols-[42%_58%]">
        <AuthImagePanel
          imageIndex={2}
          title="Verify your email address"
          text="Enter the 6-digit code sent to your email to activate your Qwetu Links account."
          linkText="Already verified?"
          linkHref="/login"
          linkLabel="Log in"
        />

        <div className="h-dvh overflow-y-auto px-4 py-6 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto flex min-h-full max-w-xl items-center">
            <div className="w-full">
              <AuthMobileHeader />
              <Suspense>
                <VerifyEmailForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
