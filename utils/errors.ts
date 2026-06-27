import { AxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export interface ApiErrorResponse {
  status: boolean;
  message: string;
  error?: Record<string, string | string[]> | null;
}

/**
 * Extract readable error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

/**
 * Apply backend field errors to RHF
 */
export function handleFormErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (!(error instanceof AxiosError)) {
    setError("root" as Path<T>, {
      type: "server",
      message: "Something went wrong",
    });

    return;
  }

  const data = error.response?.data as ApiErrorResponse;

  // General error
  if (data?.message) {
    setError("root" as Path<T>, {
      type: "server",
      message: data.message,
    });
  }

  // Field errors
  if (data?.error && typeof data.error === "object") {
    Object.entries(data.error).forEach(([field, value]) => {
      setError(field as Path<T>, {
        type: "server",
        message: Array.isArray(value)
          ? value[0]
          : String(value),
      });
    });
  }
}