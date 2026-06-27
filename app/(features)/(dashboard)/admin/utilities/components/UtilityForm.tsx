"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BillingPeriod } from "../definations";
import { UtilityFormValues, UtilitySchema } from "../utility.zod";
import { useState } from "react";
import Link from "next/link";

export const KNOWN_NAMES = ["Rent", "Water", "Garbage", "Electricity", "Security"];
const BILLING_PERIODS: BillingPeriod[] = ["monthly", "quarterly", "annual", "one-time"];

const billingLabels: Record<BillingPeriod, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
  "one-time": "One-time",
};

interface UtilityBaseFormProps {
  title: string;
  submitLabel: string;
  initialValues: UtilityFormValues;
  onSubmit: (values: UtilityFormValues) => Promise<void> | void;
}

export function UtilityBaseForm({
  title,
  submitLabel,
  initialValues,
  onSubmit,
}: UtilityBaseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UtilityFormValues>({
    resolver: zodResolver(UtilitySchema),
    defaultValues: initialValues,
  });

  const currentNameValue = useWatch({ control, name: "utilityName" });

  const [isCustom, setIsCustom] = useState(
    !KNOWN_NAMES.includes(initialValues.utilityName)
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <Link
          className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          href="/admin/utilities/"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Utility Name */}
        <div className="space-y-1.5">
          <Label htmlFor="utilityName" className="text-sm font-medium">
            Utility name
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="utilityName"
              placeholder="Enter utility name"
              className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-ring"
              {...register("utilityName")}
              aria-invalid={!!errors.utilityName}
            />

            {!isCustom ? (
              <Select
                value={KNOWN_NAMES.includes(currentNameValue) ? currentNameValue : ""}
                onValueChange={(value) => {
                  if (value === "__custom") {
                    setIsCustom(true);
                    setValue("utilityName", "");
                  } else {
                    setValue("utilityName", value);
                  }
                }}
              >
                <SelectTrigger className="w-full rounded-md border border-input bg-background text-sm shadow-none sm:w-44">
                  <SelectValue placeholder="Choose preset" />
                </SelectTrigger>
                <SelectContent>
                  {KNOWN_NAMES.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                  <SelectItem value="__custom">+ Custom Utility</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <button
                type="button"
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
                onClick={() => {
                  setIsCustom(false);
                  setValue("utilityName", "");
                }}
              >
                Preset List
              </button>
            )}
          </div>
          {errors.utilityName && (
            <p className="text-xs text-destructive">{errors.utilityName.message}</p>
          )}
        </div>

        {/* Cost + Billing Period */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="utilityCost" className="text-sm font-medium">
              Cost
            </Label>
            <Input
              id="utilityCost"
              type="number"
              min={0.01}
              step={0.01}
              placeholder="0.00"
              className="rounded-md border border-input bg-background px-4 py-2.5 text-sm shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-ring"
              {...register("utilityAmount", { valueAsNumber: true })}
              aria-invalid={!!errors.utilityAmount}
            />
            {errors.utilityAmount && (
              <p className="text-xs text-destructive">{errors.utilityAmount.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="billingPeriod" className="text-sm font-medium">
              Billing period
            </Label>
            <Controller
              name="billingPeriod"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="billingPeriod"
                    className="w-full rounded-md border border-input bg-background text-sm shadow-none"
                    aria-invalid={!!errors.billingPeriod}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BILLING_PERIODS.map((period) => (
                      <SelectItem key={period} value={period}>
                        {billingLabels[period]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.billingPeriod && (
              <p className="text-xs text-destructive">{errors.billingPeriod.message}</p>
            )}
          </div>
        </div>

        {/* Deposit */}
        <div className="space-y-1.5">
          <Label htmlFor="utilityDeposit" className="text-sm font-medium">
            Required Deposit
          </Label>
          <Input
            type="number"
            id="utilityDeposit"
            min={1}
            step={0.01}
            placeholder="0.00"
            className="rounded-md border border-input bg-background px-4 py-2.5 text-sm shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-ring"
            {...register("utilityDeposit", { valueAsNumber: true })}
            aria-invalid={!!errors.utilityDeposit}
          />
          {errors.utilityDeposit && (
            <p className="text-xs text-destructive">{errors.utilityDeposit.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="utilityDescription" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="utilityDescription"
            placeholder="Optional description"
            rows={4}
            className="resize-none rounded-md border border-input bg-background px-4 py-2.5 text-sm shadow-none transition-colors focus-visible:ring-1 focus-visible:ring-ring"
            {...register("utilityDescription")}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}