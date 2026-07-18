interface PropertyToken {
  propertyId: string;
  propertyName: string;
  propertySlug: string;
}

/**
 * Encodes property data into a Base64 URL-safe token.
 * Usage: encodePropertyToken({ propertyId: "abc", propertyName: "Kilimani Heights" })
 * → "eyJwcm9wZXJ0eUlkIjoiYWJjIiwicHJvcGVydHlOYW1lIjoiS2lsaW1hbmkgSGVpZ2h0cyJ9"
 */
export function encodePropertyToken(data: PropertyToken): string {
  const json = encodeURIComponent(JSON.stringify(data));
  // btoa works in both browser and Node (Next.js edge/server)
  return btoa(json)
    .replace(/\+/g, "-")  // make URL-safe
    .replace(/\//g, "_")
    .replace(/=+$/, "");  // strip padding
}

/**
 * Decodes a Base64 URL-safe token back into property data.
 * Returns null if the token is invalid or tampered.
 */
export function decodePropertyToken(token: string): PropertyToken | null {
  try {
    // Restore standard Base64 from URL-safe variant
    const base64 = token
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // Add back padding if stripped
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const json = decodeURIComponent(atob(padded));
    const parsed = JSON.parse(json);

    if (
      typeof parsed?.propertyId !== "string" ||
      typeof parsed?.propertyName !== "string" ||
      typeof parsed?.propertySlug !== "string"
    ) {
      return null;
    }

    return parsed as PropertyToken;
  } catch {
    return null;
  }
}
