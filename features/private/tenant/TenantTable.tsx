import { Mail, Phone } from "lucide-react";
import TenantIdentity from "./TenantIdentity";
import TenantStatus from "./TenantStatus";
import TenantActions from "./TenantActions";
import { TenantTableProps } from "./props";

export default function TenantTable({ tenants, pathname, onDelete }: TenantTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm xl:block">
      <table className="w-full table-fixed text-left text-sm">
        <thead className="border-b border-orange-100 bg-orange-50/70 text-xs uppercase text-slate-500">
          <tr>
            <th className="w-[23%] px-4 py-3 font-semibold">Tenant</th>
            <th className="w-[20%] px-4 py-3 font-semibold">Contact</th>
            <th className="w-[17%] px-4 py-3 font-semibold">Next of kin</th>
            <th className="w-[20%] px-4 py-3 font-semibold">Emergency</th>
            <th className="w-[10%] px-4 py-3 font-semibold">Status</th>
            <th className="w-[10%] px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-100">
          {tenants.map((tenant) => (
            <tr
              key={tenant.id}
              className="align-top transition hover:bg-slate-50"
            >
              <td className="px-4 py-4">
                <TenantIdentity tenant={tenant} />
              </td>
              <td className="px-4 py-4">
                <div className="space-y-1 text-slate-600">
                  <p className="flex items-center gap-2 break-all">
                    <Mail size={14} />
                    {tenant.user.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} />
                    {tenant.user.phone}
                  </p>
                </div>
              </td>
              <td className="px-4 py-4 text-slate-600">
                <p className="break-words font-medium text-slate-800">
                  {tenant.nextOfKinName}
                </p>
                <p className="mt-1 text-xs">{tenant.nextOfKinPhone}</p>
              </td>
              <td className="px-4 py-4 text-slate-600">
                <p className="break-words font-medium text-slate-800">
                  {tenant.user.emergencyContactName}
                </p>
                <p className="mt-1 text-xs">
                  {tenant.user.emergencyContactPhone}
                </p>
                <p className="mt-1 break-words text-xs">
                  {tenant.user.emergencyContactRelationship}
                </p>
              </td>
              <td className="px-4 py-4">
                <TenantStatus tenant={tenant} />
              </td>
              <td className="px-4 py-4">
                <TenantActions
                  viewHref={`${pathname}/${tenant.id}`}
                  editHref={`${pathname}/${tenant.id}/edit`}
                  onDelete={() => onDelete(tenant)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
