import { Edit3, Eye } from "lucide-react";
import Link from "next/link";
import { Business } from "../definations";

// function businessHrefId(business: Business) {
//   return encodeURIComponent(String(business.id));
// }

export function BusinessActions({ business }: { business: Business }) {
  console.log("business Id", business)

  return (
    <div className="flex gap-2 sm:justify-end">
      <Link
        // href={`/qwetulinks/accounts/${id}`}
        href=""
        title="View business"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <Eye size={15} />
      </Link>
      <Link
        // href={`/qwetulinks/accounts/${id}/edit`}
        href=""
        title="Edit business"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-orange-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
      >
        <Edit3 size={15} />
      </Link>
    </div>
  );
}
