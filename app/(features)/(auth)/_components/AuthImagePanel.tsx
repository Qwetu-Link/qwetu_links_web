import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroImages } from "../../_portfolio/_component/propertyData";

type AuthImagePanelProps = {
  imageIndex?: number;
  title: string;
  text: string;
  linkText: string;
  linkHref: string;
  linkLabel: string;
};

export default function AuthImagePanel({
  imageIndex = 0,
  title,
  text,
  linkText,
  linkHref,
  linkLabel,
}: AuthImagePanelProps) {
  return (
    <div className="relative hidden h-dvh overflow-hidden bg-brand-dark md:block">
      <Image
        src={heroImages[imageIndex]}
        alt="Modern Qwetu Links property"
        fill
        sizes="42vw"
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-brand-dark/55" />
      <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-44">
            <Image
              src="/images/_qwetu_logo_orange.webp"
              width={800}
              height={560}
              className="h-auto w-full"
              alt="Qwetu Links"
              loading="eager"
              priority
            />
          </div>
        </div>
        <div className="pb-2">
          <h2 className="text-3xl font-bold leading-tight">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
          <p className="mt-4 text-sm text-white/75">
            {linkText}{" "}
            <Link
              href={linkHref}
              className="font-semibold text-rental-primary underline-offset-4 hover:underline"
            >
              {linkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
