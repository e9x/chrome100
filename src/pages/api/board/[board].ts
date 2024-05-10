import { getBrands, getRecoveryImages, getTarget } from "@lib/db";
import { getShims } from "@lib/shim";
import type { APIRoute } from "astro";
import {
  getRecoveryURL,
  type cros_brand,
  type cros_recovery_image_db,
  type cros_target,
} from "chrome-versions";

// unfortunately we can't pre-render without losing content-type
// but prerendering works fine
export const prerender = false;

export const GET: APIRoute = ({ params: { board } }) => {
  const target = getTarget.get(board) as cros_target | undefined;
  if (!target) return new Response(null, { status: 404 });

  const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
  const brands = getBrands.all(board) as cros_brand[];

  const shims = getShims(board);

  return new Response(
    JSON.stringify({
      images: images.map((image) => {
        // parses/sets the recovery image URL for the API
        const data: cros_recovery_image_db & { url?: string } = image;
        data.url = getRecoveryURL(image);
        return data;
      }),
      brands,
      shims,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};
