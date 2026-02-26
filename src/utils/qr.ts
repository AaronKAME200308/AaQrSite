import { PLATFORM_KEYS } from "../constants/platforms";
import type { Profile, FormData } from "../types";

export function parseQRData(): Profile {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get("name") || "",
    bio: params.get("bio") || "",
    links: PLATFORM_KEYS.filter((k) => params.has(k)).map((k) => ({
      platform: k,
      url: params.get(k)!,
    })),
  };
}

export function buildProfileURL(form: FormData): string {
  const base = window.location.href.split("?")[0];
  const params = new URLSearchParams();
  Object.entries(form).forEach(([k, v]) => {
    if (v?.trim()) params.set(k, v.trim());
  });
  return `${base}?${params.toString()}`;
}

export function hasQRData(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has("name") || PLATFORM_KEYS.some((k) => params.has(k));
}