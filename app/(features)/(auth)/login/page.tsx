import { Suspense } from "react";
import LoginForm from "./form/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:px-6 md:h-screen md:py-0">
      <div className="relative mx-auto flex w-full max-w-[420px] flex-col space-y-4 sm:max-w-[400px] md:-mt-32">
        <div className="flex w-full items-center justify-center rounded-lg py-2 sm:py-3 md:h-36">
          <div className="w-28 text-white sm:w-32 md:w-36">
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
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
