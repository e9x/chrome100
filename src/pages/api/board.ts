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
  "SELECT * FROM cros_brand WHERE board = ? ORDER BY brand COLLATE NOCASE ASC;"
);

export interface BoardData {
  target: cros_target;
  images: cros_recovery_image_db[];
  brands: cros_brand[];
}

const boardAPI = (req: NextApiRequest, res: NextApiResponse) => {
  const { board } = req.query as { board: string };

  const target = getTarget.get(board) as cros_target;
  const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
  const brands = getBrands.all(board) as cros_brand[];

  const boardData: BoardData = {
    target,
    images,
    brands,
  };

  res.json(boardData);
};

export default boardAPI;
