import { AxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export interface ApiErrorResponse {
  status: boolean;
  message: string;
  error?: Record<string, string | string[]> | null;
}

/**
 * True when the request never got a response from the server:
 * no internet, DNS failure, CORS block, server down, etc.
 * (Distinct from a timeout, which Axios also surfaces this way.)
 */

export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof AxiosError &&
    !error.response &&
    (error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      error.message === "Network Error")
  );
}

/**
 * Extract readable error message
 */
export function getErrorMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return (error as AxiosError).code === "ECONNABORTED"
      ? "Request timed out. Please check your connection and try again."
      : "Please check your internet connection.";
  }

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

  if (isNetworkError(error)) {
    setError("root" as Path<T>, {
      type: "network",
      message: getErrorMessage(error),
    });
    return;
  }

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
  } else {
    setError("root" as Path<T>, {
      type: "server",
      message: getErrorMessage(error),
    })
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