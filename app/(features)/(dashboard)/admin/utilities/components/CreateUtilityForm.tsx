"use client";

import { toast } from "sonner";
import { useCreateUtility } from "@/hooks/useUtility";
import { UtilityFormValues } from "@/schemas/utility.zod";
import { UtilityBaseForm } from "./UtilityForm";
// import { handleFormErrors } from "@/app/lib/errors";

interface CreateUtilityFormProps {
    propertyID: string;
}

export function CreateUtilityForm({ propertyID }: CreateUtilityFormProps) {

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
                onError: () => {
                    toast.error("Failed to create tenant. Please try again.");
                },
            });
        } catch (error) {
            console.log(error)
            //   handleFormErrors(error, setError);

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