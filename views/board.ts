import { parseChromeVersion, parsePlatformVersion } from "chrome-versions";

const recoveryImages =
  document.querySelector<HTMLTableSectionElement>("#recoveryImages")!;

// store image sort preferences in localStorage
// sort clientside

// by default, sort by last modified
let imageSortOrder: SortOrder =
  "imageSortOrder" in localStorage
    ? (localStorage.imageSortOrder as SortOrder)
    : "chrome";

const inputImageSortOrder =
  document.querySelector<HTMLInputElement>("#imageSortOrder")!;

inputImageSortOrder.value = imageSortOrder;

inputImageSortOrder.addEventListener("change", () => {
  imageSortOrder = inputImageSortOrder.value as SortOrder;
  localStorage.imageSortOrder = imageSortOrder;
  sortImages();
});

// by default, show the images in reverse order
let imageSortReverse =
  "imageSortReverse" in localStorage
    ? localStorage.imageSortReverse === "1"
    : true;

const inputImageSortReverse =
  document.querySelector<HTMLInputElement>("#imageSortReverse")!;

inputImageSortReverse.checked = imageSortReverse;

inputImageSortReverse.addEventListener("change", () => {
  imageSortReverse = inputImageSortReverse.checked;
  if (imageSortReverse) localStorage.imageSortReverse = "1";
  else delete localStorage.imageSortReverse;
  sortImages();
});

type SortOrder = "lastModified" | "chrome" | "platform";

const sortVersions = (a: number[], b: number[]) => {
  if (a.length !== b.length) throw new Error("array length mismatch");
  for (let i = 0; i < a.length; i++) if (a !== b) return a[i] > b[i] ? 1 : -1;
  return b.length - a.length;
};

const sortImages = () => {
  const children = [...recoveryImages.children];

  children.sort((a, b) => {
    switch (imageSortOrder) {
      case "chrome": {
        const av = parseChromeVersion(a.getAttribute("data-chrome")!);
        const bv = parseChromeVersion(b.getAttribute("data-chrome")!);
        return sortVersions(av, bv);
      }
      case "platform": {
        const av = parsePlatformVersion(a.getAttribute("data-platform")!);
        const bv = parsePlatformVersion(b.getAttribute("data-platform")!);
        return sortVersions(av, bv);
      }
      case "lastModified":
        return (
          Number(a.getAttribute("data-modified")) -
          Number(b.getAttribute("data-modified"))
        );
    }
  });

  if (imageSortReverse) children.reverse();

  for (const child of children) recoveryImages.append(child);
};

sortImages();
