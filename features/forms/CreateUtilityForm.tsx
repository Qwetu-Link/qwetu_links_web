"use client";

import { toast } from "sonner";
import { useCreateUtility } from "@/hooks/useUtility";
import { UtilityFormValues } from "@/schemas/utility.zod";
import { UtilityBaseForm } from "./UtilityForm";
import { handleFormErrors } from "@/utils/errors";
import { useForm } from "react-hook-form";
// import { handleFormErrors } from "@/app/lib/errors";

interface CreateUtilityFormProps {
    propertyID: string;
}

export function CreateUtilityForm({ propertyID }: CreateUtilityFormProps) {

    const { setError } = useForm();

    const createMutate = useCreateUtility()

    const initialValues: UtilityFormValues = {
        propertyID: propertyID,
        utilityName: "",
        utilityAmount: 0,
        billingPeriod: "monthly",
        utilityDeposit: 0,
        utilityDescription: "",
    };

    const handleCreateSubmit = async (data: UtilityFormValues) => {

        try {
            await createMutate.mutateAsync(data, {
                onSuccess: () => {
                    toast.success(`"${data.utilityName}" add to propery`);
                },
                onError: (error) => {
                    handleFormErrors<UtilityFormValues>(error, setError);
                }
            });
        } catch (error) {
            // console.log(error)
            handleFormErrors(error, setError);

        }

    };

    return (
        <UtilityBaseForm
            title="Add utility"
            submitLabel="Create utility"
            initialValues={initialValues}
            onSubmit={handleCreateSubmit}
        />
    );
}