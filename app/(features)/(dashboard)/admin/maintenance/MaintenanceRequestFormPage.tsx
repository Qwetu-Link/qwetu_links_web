"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  emptyMaintenanceRequest,
  initialMaintenanceRequest,
} from "./data";
import type { MaintenanceRequest } from "./definitions";
import MaintenanceForm from "./_components/MaintenanceForm";

type MaintenanceRequestFormPageProps = {
  mode: "create" | "edit";
  basePath?: string;
  requestId?: string;
};

function createRequestDefaults(): MaintenanceRequest {
  return {
    ...emptyMaintenanceRequest,
    reported_date: new Date().toISOString().slice(0, 16),
  };
}

export default function MaintenanceRequestFormPage({
  mode,
  basePath = "/maintenance",
  requestId,
}: MaintenanceRequestFormPageProps) {
  const router = useRouter();
  const [form, setForm] = useState<MaintenanceRequest>(() =>
    mode === "edit"
      ? { ...initialMaintenanceRequest, id: requestId || initialMaintenanceRequest.id }
      : createRequestDefaults(),
  );

  function updateField<K extends keyof MaintenanceRequest>(
    key: K,
    value: MaintenanceRequest[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(basePath);
  }

  return (
    <div className="custom-scrollbar h-full overflow-y-auto bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <header className="flex flex-col gap-3">
          <Link
            href={basePath}
            className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-orange-100 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          >
            <ArrowLeft size={16} />
            Back to requests
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              {mode === "edit" ? "Edit Maintenance Request" : "New Maintenance Request"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "edit"
                ? `Update request ${form.id}.`
                : "Fill in the details for a new maintenance request."}
            </p>
          </div>
        </header>

        <MaintenanceForm
          request={form}
          editingId={mode === "edit" ? form.id : ""}
          onChange={updateField}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
