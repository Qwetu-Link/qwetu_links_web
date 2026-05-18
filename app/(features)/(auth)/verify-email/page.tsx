import { Suspense } from "react";
import Image from "next/image";
import VerifyEmailHandler from "./verify-email-handler";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-6">
        <div className="w-28 sm:w-32">
          <Image
            src="/images/qwetu_logo.webp"
            width={800}
            height={560}
            className="h-auto w-full"
            alt="Qwetu Links"
            loading="eager"
            priority
          />
        </div>
        <Suspense>
          <VerifyEmailHandler />
        </Suspense>
      </div>
    </main>
  );
}