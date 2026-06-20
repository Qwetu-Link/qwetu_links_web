// UnitEditForm.tsx
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Images, UnitProperty } from "../definations";
import { UnitFormFields } from "./UnitFormField";
import { unitFormSchema, UnitFormValues } from "../units.zod";
import { PropertyStatus } from "../../property/definations";
import { toast } from "sonner";
import { useUpdateUnit } from "../units.services";
import Link from "next/link";
import { handleFormErrors } from "@/app/lib/errors";

interface UnitEditFormProps {
  unit: UnitProperty;
  businessId: string;
}

export default function UnitEditForm({ unit }: UnitEditFormProps) {
  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      propertyID: unit.propertyID,
      unitNumber: unit.unitNumber,
      unitFloor: unit.unitFloor,
      status: unit.status as PropertyStatus,
      size: unit.size,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      // rentAmount: unit.rentAmount,
      parking: unit.parking,
      image: unit.images?.map((img: Images) => img.url) ?? [],
      version: unit.version,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     console.error("❌ Zod Validation Errors:", errors);
  //   }
  // }, [errors]);

  const { mutate: updateUnit } = useUpdateUnit();

  const onSubmit: SubmitHandler<UnitFormValues> = async (values) => {
    try {
      updateUnit(
        { id: unit.id, data: values },
        {
          onSuccess: () => {
            toast.success(`"${values.unitNumber}" updated successfully`);
          },
          onError: (error) => {
            toast.error(error.message ?? "Failed to update unit.");
          },
        },
      );
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Edit Unit — {unit.unitNumber}
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Update the details for this unit. Only changed fields will be saved.
        </p>
        <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-600" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <UnitFormFields
          form={form}
          // businessId={businessId}
          // initialImages={unit.image?.map((img: Images) => ({
          //   id: img.id, // Fixed: included id parameter mapping
          //   url: img.url,
          //   path: img.path ?? "",
          // }))}

          // initialImages={(unit.images || []).map(
          //   (img: Images) => ({
          //     id: img.id, // Fallback id if id field is missing
          //     url: img.url || "",
          //     path: img.path || "",
          //   }),
          // )}
        />
        {errors.root && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        {/* 🚨 VISUAL ERROR DEBUGGING BLOCK 🚨 */}
        {/* {Object.keys(errors).length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-800">
              <AlertCircle size={16} />
              <span>Form cannot save due to validation errors:</span>
            </div>
            <ul className="mt-2 list-disc pl-5 text-xs text-red-700 space-y-1">
              {Object.entries(errors).map(([fieldName, error]) => (
                <li key={fieldName}>
                  <strong>{fieldName}:</strong>{" "}
                  {error?.message || "Invalid value"}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <Link
            href={`/admin/unit`}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Save size={15} />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
// // UnitEditForm.tsx
// "use client";

// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Save } from "lucide-react";
// import { Images, UnitProperty } from "../definations";
// import { UnitFormFields } from "./UnitFormField";
// import { unitFormSchema, UnitFormValues } from "../units.zod";
// import { PropertyStatus } from "../../property/definations";
// import { toast } from "sonner";
// import { useUpdateUnit } from "../units.services";
// import Link from "next/link";

// interface UnitEditFormProps {
//   unit: UnitProperty;
//   businessId: string;
// }

// export default function UnitEditForm({ unit, businessId }: UnitEditFormProps) {
//   const form = useForm<UnitFormValues>({
//     resolver: zodResolver(unitFormSchema),
//     defaultValues: {
//       propertyID: unit.propertyId,
//       unitNumber: unit.unitNumber,
//       unitFloor: unit.unitFloor,
//       status: unit.status as PropertyStatus,
//       size: unit.size,
//       bedrooms: unit.bedrooms,
//       bathrooms: unit.bathrooms,
//       parking: unit.parking,
//       image: unit.image?.map((img: Images) => img.url) ?? [],
//       version: unit.version,
//     },
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = form;

//   // const updateUnit = useUpdateUnit();
//   const { mutate: updateUnit } = useUpdateUnit();

//   const onSubmit: SubmitHandler<UnitFormValues> = async (values) => {
//     console.log("Edit unit:", values);
//     // call your update mutation here
//     updateUnit(
//       { id: unit.id, data: values },
//       {
//         onSuccess: () => {
//           toast.success(`"${values.unitNumber}" updated successfully`);
//         },
//         onError: (error) => {
//           toast.error(error.message ?? "Failed to update unit.");
//         },
//       },
//     );
//   };

//   return (
//     <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Edit Unit — {unit.unitNumber}
//         </h2>
//         <p className="mt-1 text-sm text-gray-400">
//           Update the details for this unit. Only changed fields will be saved.
//         </p>
//         <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-600" />
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <UnitFormFields
//           form={form}
//           businessId={businessId}
//           //   initialImages={unit.imagesUrl?.map((url) => ({ url, path: "" }))}
//           initialImages={unit.image?.map((img: Images) => ({
//             url: img.url,
//             path: img.path ?? "",
//           }))}
//         />

//         <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
//           <Link
//             href={`/admin/unit`}
//             type="button"
//             className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
//           >
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             onClick={() => console.log("clicked")}
//             className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
//           >
//             <Save size={15} />
//             {isSubmitting ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
