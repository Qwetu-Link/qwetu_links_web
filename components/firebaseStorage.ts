import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

// folders

export const maintenanceRef = "images/maintenance/";
export const propertyRef = "images/property/";
export const unitRef = "images/unit/";
export const profileRef = "images/profile/";

// Constants

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Types

export type UploadResult = {
  url: string;
  path: string;
  fileName: string;
};

type UploadOptions = {
  file: File;
  folder: string;
  onProgress?: (progress: number) => void;
};

type UpdateOptions = {
  oldPath?: string;
  newFile: File;
  folder: string;
  onProgress?: (progress: number) => void;
};

// Helpers

/**
 * Validates that the file is an allowed image type and within the size limit.
 * Throws a descriptive Error if validation fails.
 */
const validateImageFile = (file: File): void => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}.`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds the ${MAX_FILE_SIZE_MB} MB limit.`,
    );
  }
};

/**
 * Extracts a human-readable message from a Firebase Storage error code.
 */
const getStorageErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    const code = (error as Error & { code?: string }).code;
    switch (code) {
      case "storage/object-not-found":
        return "File does not exist.";
      case "storage/unauthorized":
        return "You do not have permission to perform this action.";
      case "storage/canceled":
        return "Operation was canceled.";
      case "storage/unknown":
        return "An unknown storage error occurred.";
      default:
        return error.message || fallback;
    }
  }
  return fallback;
};

// ─── Core Functions

/**
 * Uploads an image file to Firebase Storage.
 * Validates file type and size before uploading.
 */
export const uploadFile = ({
  file,
  folder,
  onProgress,
}: UploadOptions): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    try {
      validateImageFile(file);

      // Use crypto.randomUUID() to avoid timestamp-based filename collisions.
      const fileName = `${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}-${file.name}`;
      const path = `${folder}/${fileName}`;
      const storageRef = ref(storage, path);
      const metadata = { contentType: file.type };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(Math.round(progress));
        },
        (error) => {
          reject(new Error(getStorageErrorMessage(error, "Upload failed.")));
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, path, fileName });
          } catch (error) {
            reject(
              new Error(
                `File uploaded, but failed to retrieve download URL: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              ),
            );
          }
        },
      );
    } catch (error) {
      // Covers validation errors and any unexpected synchronous failures.
      reject(
        error instanceof Error
          ? error
          : new Error(
              `Something went wrong while starting the upload: ${String(error)}`,
            ),
      );
    }
  });
};

/**
 * Deletes a file from Firebase Storage by its path.
 * Throws on failure (consistent with uploadFile / updateFile).
 */
export const deleteFile = async (path: string): Promise<void> => {
  if (!path) throw new Error("File path is required.");

  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(getStorageErrorMessage(error, "Failed to delete file."));
  }
};

/**
 * Replaces an existing image with a new one.
 * Uploads the new file first; only deletes the old file after a successful upload
 * to avoid data loss if the upload fails.
 */
export const updateFile = async ({
  oldPath,
  newFile,
  folder,
  onProgress,
}: UpdateOptions): Promise<UploadResult> => {
  // 1. Upload new file first — if this throws, the old file is untouched.
  let uploadedFile: UploadResult;
  try {
    uploadedFile = await uploadFile({ file: newFile, folder, onProgress });
  } catch (error) {
    throw new Error(
      `Failed to upload new file: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  // 2. Delete the old file only after the new upload has succeeded.
  if (oldPath) {
    try {
      await deleteFile(oldPath);
    } catch (error) {
      // Non-fatal: new file is already live. Log and continue.
      console.warn(
        `New file uploaded successfully, but the old file at "${oldPath}" could not be deleted:`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  return uploadedFile;
};
