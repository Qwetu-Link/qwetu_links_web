import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Utility } from "@/types/utilities.definations";

interface Props {
    utility: Utility;
    onDelete: (id: string, name: string) => void;
}

const billingLabels: Record<Utility["billingPeriod"], string> = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annual",
    "one-time": "One-time",
};

export default function UtilityCard({ utility, onDelete }: Props) {
    return (
        <div className="group bg-white rounded-sm border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 leading-tight">
                        {utility.utilityName}
                    </h3>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <Link
                        href={`/admin/utilities/${utility.id}/edit`}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                        <Edit size={14} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => onDelete(utility.id, utility.utilityName)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
                {utility.utilityDescription}
            </p>

            <div className="mt-5 flex items-center gap-3 font-bold rounded-xl border border-gray-100 bg-slate-50 p-3 text-gray-900">
                KES {utility.utilityAmount ? utility.utilityAmount.toLocaleString() : "0"}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    {billingLabels[utility.billingPeriod]}
                </span>
            </div>
        </div>
    );
}