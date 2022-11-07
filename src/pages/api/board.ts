import type { NextApiRequest, NextApiResponse } from "next";
import type {
  cros_brand,
  cros_recovery_image_db,
  cros_target,
} from "chrome-versions";
import { getBrands, getRecoveryImages, getTarget } from "../../db";

interface BoardData {
  images: cros_recovery_image_db[];
  brands: cros_brand["brand"][];
}

const boardAPI = (req: NextApiRequest, res: NextApiResponse) => {
  const { board } = req.query as { board: string };

  if (!board) {
    res.status(400);
    res.json({ error: "BadRequest" });
    return;
  }

  const target = getTarget.get(board) as cros_target | undefined;

  if (!target) {
    res.status(404);
    res.json({ error: "NotFound" });
    return;
  }

  const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
  const brands = getBrands.all(board) as cros_brand[];

  const boardData: BoardData = {
    images,
    brands: brands.map((brand) => brand.brand),
  };

  res.json(boardData);
};

export default boardAPI;
