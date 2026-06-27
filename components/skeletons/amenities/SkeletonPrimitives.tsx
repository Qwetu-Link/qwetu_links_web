import type { CSSProperties } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function SkeletonBlock({ className, style }: SkeletonProps) {
  return (
    <div
      style={style}
      className={cn(
        "animate-pulse rounded-md bg-slate-200/80",
        className
      )}
    />
  );
}

export function SkeletonIcon({ className }: SkeletonProps) {
  return (
    <SkeletonBlock
      className={cn("h-10 w-10 rounded-full bg-emerald-100", className)}
    />
  );
}

export function PageHeaderSkeleton({
  actions = 2,
  compact = false,
}: {
  actions?: number;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <SkeletonIcon className={compact ? "h-9 w-9" : "h-11 w-11"} />
        <div className="space-y-3">
          <SkeletonBlock className={compact ? "h-7 w-56" : "h-8 w-72"} />
          <SkeletonBlock className="h-4 w-64 max-w-[70vw]" />
        </div>
      </div>
      {actions > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: actions }).map((_, index) => (
            <SkeletonBlock key={index} className="h-10 w-32 rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
}

export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-7 w-28" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
            <SkeletonIcon className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function FilterBarSkeleton({ controls = 3 }: { controls?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        <SkeletonBlock className="h-11 flex-1 rounded-xl" />
        {Array.from({ length: controls }).map((_, index) => (
          <SkeletonBlock key={index} className="h-11 w-full rounded-xl lg:w-40" />
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton({
  count = 6,
  columns = "lg:grid-cols-3",
}: {
  count?: number;
  columns?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", columns)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <SkeletonIcon className="h-12 w-12" />
              <div className="space-y-2">
                <SkeletonBlock className="h-5 w-36" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            </div>
            <SkeletonBlock className="h-7 w-20 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="space-y-2">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}