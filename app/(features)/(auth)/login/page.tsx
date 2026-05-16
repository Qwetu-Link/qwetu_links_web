import { Suspense } from "react";
import LoginForm from "./form/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg flex justify-center p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Image
              src="/images/qwetu_logo.webp"
              width={800}
              height={560}
              className="hidden md:block"
              alt="Qwetu Links"
              loading="eager"
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
