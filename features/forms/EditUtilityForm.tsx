"use client";

import { useMemo } from "react";
import { Utility } from "@/types/utilities.definations";
import { UtilityFormValues } from "@/schemas/utility.zod";
import { KNOWN_NAMES, UtilityBaseForm } from "./UtilityForm";
import { useUpdateUtility } from "@/hooks/useUtility";
import { toast } from "sonner";
import { handleFormErrors } from "@/utils/errors";
import { useForm } from "react-hook-form";

interface EditUtilityFormProps {
  utility: Utility;
}

export function EditUtilityForm({ utility }: EditUtilityFormProps) {

  const { setError } = useForm();
  const initialValues = useMemo<UtilityFormValues>(() => {
    return {
      propertyID: utility.propertyID,
      utilityName: utility.utilityName ?? "",
      utilityAmount: utility.utilityAmount ?? 0,
      billingPeriod: utility.billingPeriod ?? "monthly",
      utilityDeposit: utility.utilityDeposit ?? 0,
      utilityDescription: utility.utilityDescription ?? "",
      isCustomName: !KNOWN_NAMES.includes(utility.utilityName),
      version: utility.version,
    };
  }, [utility]);

  const { mutate: updateUnit } = useUpdateUtility();

  const handleEditSubmit = async (data: UtilityFormValues) => {
    try {
      updateUnit(
        { id: utility.id, data: data },
        {
          onSuccess: () => {
            toast.success(`"${data.utilityName}" updated successfully`);
          },
          onError: (error) => {
            handleFormErrors<UtilityFormValues>(error, setError);
          }
        },
      );
    } catch (error) {
      // console.log(error)
      handleFormErrors(error, setError);
    }
  };


  return (
    <UtilityBaseForm
      title={`Edit ${utility.utilityName}`}
      submitLabel="Save changes"
      initialValues={initialValues}
      onSubmit={handleEditSubmit}
    />
  );
}