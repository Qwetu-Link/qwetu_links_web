import type { FormEvent } from "react";
import { CalendarDays, Save } from "lucide-react";
import type {
  MaintenancePriority,
  MaintenanceRequest,
  MaintenanceStatus,
} from "../definitions";
import { fieldClass, formatDate } from "../utils";

type MaintenanceFormProps = {
  request: MaintenanceRequest;
  editingId: string;
  onChange: <K extends keyof MaintenanceRequest>(
    key: K,
    value: MaintenanceRequest[K],
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function MaintenanceForm({
  request,
  editingId,
  onChange,
  onSubmit,
}: MaintenanceFormProps) {
  return (
    <aside className="rounded-lg border border-orange-100 bg-white shadow-sm">
      <div className="border-b border-orange-100 p-4">
        <h2 className="text-lg font-bold text-slate-950">
          {editingId ? "Edit Request" : "Create Request"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {editingId || "A new request id will be generated on save."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 p-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Unit ID</span>
            <input
              value={request.unit_id}
              onChange={(event) => onChange("unit_id", event.target.value)}
              className={fieldClass}
              required
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Tenant ID
            </span>
            <input
              value={request.tenant_id}
              onChange={(event) => onChange("tenant_id", event.target.value)}
              className={fieldClass}
              required
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            value={request.title}
            onChange={(event) => onChange("title", event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Issue</span>
          <textarea
            value={request.issue}
            onChange={(event) => onChange("issue", event.target.value)}
            className={`${fieldClass} min-h-24 resize-y`}
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Priority</span>
            <select
              value={request.priority}
              onChange={(event) =>
                onChange("priority", event.target.value as MaintenancePriority)
              }
              className={fieldClass}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <select
              value={request.status}
              onChange={(event) =>
                onChange("status", event.target.value as MaintenanceStatus)
              }
              className={fieldClass}
            >
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Reported Date
            </span>
            <input
              value={request.reported_date}
              onChange={(event) =>
                onChange("reported_date", event.target.value)
              }
              className={fieldClass}
              type="datetime-local"
              required
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Resolved Date
            </span>
            <input
              value={request.resolved_date}
              onChange={(event) =>
                onChange("resolved_date", event.target.value)
              }
              className={fieldClass}
              type="date"
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Cost</span>
          <input
            value={request.cost}
            onChange={(event) => onChange("cost", Number(event.target.value))}
            className={fieldClass}
            min="0"
            type="number"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Notes</span>
          <textarea
            value={request.notes}
            onChange={(event) => onChange("notes", event.target.value)}
            className={`${fieldClass} min-h-24 resize-y`}
          />
        </label>

        <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          <div className="mb-2 flex items-center gap-2 font-medium text-slate-800">
            <CalendarDays size={15} />
            Resolution
          </div>
          <p>Reported: {formatDate(request.reported_date)}</p>
          <p>Resolved: {formatDate(request.resolved_date)}</p>
        </div>

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save Request
        </button>
      </form>
    </aside>
  );
}
