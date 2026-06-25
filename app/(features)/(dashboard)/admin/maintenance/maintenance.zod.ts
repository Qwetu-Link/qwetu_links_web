import { z } from "zod";
import { categoryKeys, maintenancePriorityValues, maintenanceStatusValues } from "./definitions";

export const editMaintenanceFormSchema = z.object({
    id: z.string(),
    category: z.enum(categoryKeys, {
        message: "Category is required",
    }),
    assignedTo: z.string().optional(),
    title: z
        .string({ message: "Title field is required" })
        .min(2)
        .max(100)
        .trim(),
    issue: z
        .string()
        .trim() // Automatically removes leading/trailing spaces
        .min(5, { message: "Please provide a description of at least 10 characters." })
        .max(1000, { message: "Description cannot exceed 1000 characters." }),
    priority: z.enum(maintenancePriorityValues, {
        message: "Priority is required",
    }),
    status: z.enum(maintenanceStatusValues, {
        message: "Status is required",
    }),
    cost: z.number().nonnegative({ message: " The number Cannot be negative" }).min(0).optional(),
    notes: z
        .string()
        .trim()
        .min(0)
        .max(500, { message: "Notes cannot exceed 500 characters." })
        .optional()
        .or(z.literal("").transform(() => undefined)),
    version: z.number().nonnegative(),
});

export const addMaintenanceFormSchema = z.object({
    unitID: z.string(),
    category: z.enum(categoryKeys, {
        message: "Category is required",
    }),
    title: z
        .string({ message: "Title field is required" })
        .min(5, { message: "Please provide a title of at least 10 characters." })
        .max(100)
        .trim(),
    issue: z
        .string()
        .trim() // Automatically removes leading/trailing spaces
        .min(5, { message: "Please provide a description of at least 10 characters." })
        .max(1000, { message: "Description cannot exceed 1000 characters." }),
    priority: z.enum(maintenancePriorityValues, {
        message: "Priority is required",
    }),
    status: z.enum(maintenanceStatusValues, {
        message: "Status is required",
    }),
    notes: z
        .string()
        .trim()
        .min(0)
        .max(500, { message: "Notes cannot exceed 500 characters." })
        .optional()
        .or(z.literal("").transform(() => undefined)),
});


export type EditMaintenanceFormValues = z.infer<typeof editMaintenanceFormSchema>;
export type AddMaintenanceFormValues = z.infer<typeof addMaintenanceFormSchema>;


