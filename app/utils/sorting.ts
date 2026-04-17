import { Doctor } from "../data/types";

export function sortDoctorsByRating(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort(
    (a, b) => Number((b as any).rating ?? 0) - Number((a as any).rating ?? 0)
  );
}

export function sortDoctorsByExperience(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort(
    (a, b) => Number((b as any).experience ?? 0) - Number((a as any).experience ?? 0)
  );
}
