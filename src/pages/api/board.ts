import type { NextApiRequest, NextApiResponse } from "next";
import Database from "better-sqlite3";
import type {
  cros_brand,
  cros_recovery_image_db,
  cros_target,
} from "chrome-versions";
import { chromeDBPath } from "chrome-versions/db";

const db = new Database(chromeDBPath);

const getTarget = db.prepare<[board: string]>(
  "SELECT * FROM cros_target WHERE board = ? ORDER BY board COLLATE NOCASE ASC;"
);
const getRecoveryImages = db.prepare<[board: string]>(
  "SELECT * FROM cros_recovery_image WHERE board = ?;"
);
const getBrands = db.prepare<[board: string]>(
  "SELECT brand FROM cros_brand WHERE board = ? ORDER BY brand COLLATE NOCASE ASC;"
);

export interface BoardData {
  images: cros_recovery_image_db[];
  brands: cros_brand["brand"][];
}

const boardAPI = (req: NextApiRequest, res: NextApiResponse) => {
  const { board } = req.query as { board: string };

  const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
  const brands = getBrands.all(board) as cros_brand[];

  const boardData = {
    images: images,
    brands: brands.map((brand) => brand.brand),
  };

  res.json(boardData);
};

export default boardAPI;
