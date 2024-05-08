import {
  parseChromeVersion,
  parsePlatformVersion,
  type cros_recovery_image_db,
} from "chrome-versions";

export type SortOrder = "lastModified" | "chrome" | "platform";

const sortVersions = (a: number[], b: number[]) => {
  if (a.length !== b.length) throw new Error("array length mismatch");
  for (let i = 0; i < a.length; i++) if (a !== b) return a[i] > b[i] ? 1 : -1;
  return b.length - a.length;
};

export function sortImages(
  sortOrder: SortOrder,
  sortReverse: boolean,
  images: Readonly<cros_recovery_image_db[]>
): cros_recovery_image_db[] {
  const sorted = [...images];

  sorted.sort((a, b) => {
    switch (sortOrder) {
      case "chrome": {
        const av = parseChromeVersion(a.chrome);
        const bv = parseChromeVersion(b.chrome);
        return sortVersions(av, bv);
      }
      case "platform": {
        const av = parsePlatformVersion(a.platform);
        const bv = parsePlatformVersion(b.platform);
        return sortVersions(av, bv);
      }
      case "lastModified":
        return (
          new Date(a.last_modified).getTime() -
          new Date(b.last_modified).getTime()
        );
      default:
        throw new Error(`Unknown order ${sortOrder}`);
    }
  });

  if (sortReverse) sorted.reverse();

  return sorted;
}
