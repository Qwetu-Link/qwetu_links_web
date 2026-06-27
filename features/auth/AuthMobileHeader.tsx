import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthMobileHeader() {
  return (
    <>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition hover:text-rental-primary md:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Back Home
      </Link>
      <div className="mb-6 flex justify-center md:hidden">
        <Image
          src="/images/qwetu_logo.webp"
          width={180}
          height={126}
          className="h-auto w-36"
          alt="Qwetu Links"
          priority
        />
      </div>
    </>
  );
}
