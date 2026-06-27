import { featureChecks } from "@/utils/footer.config";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-md bg-rental-bg-light">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1100&q=80"
            alt="Modern apartment interior"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            unoptimized
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rental-primary">
            Our story
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
            Built for practical property decisions
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Property discovery can feel scattered: unclear details, slow
            responses, and listings that are hard to compare. Qwetu Links brings
            the process into one cleaner experience so people can search, view,
            list, and rent with more confidence.
          </p>
          <div className="mt-6 space-y-4">
            {featureChecks.map((item) => (
              <p key={item} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-rental-primary" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
