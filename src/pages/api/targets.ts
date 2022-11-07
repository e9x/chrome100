import type { NextApiRequest, NextApiResponse } from "next";
import type { cros_brand, cros_target } from "chrome-versions";
import db from "../../db";

const getTargets = db.prepare<[]>(
  "SELECT * FROM cros_target ORDER BY board COLLATE NOCASE ASC;"
);
const getBrands = db.prepare<[board: string]>(
  "SELECT brand FROM cros_brand WHERE board = ? ORDER BY brand COLLATE NOCASE ASC;"
);

export type Targets = [
  target: cros_target["board"],
  brands: cros_brand["brand"][]
][];

const targetsAPI = (req: NextApiRequest, res: NextApiResponse) => {
  res.json(
    (getTargets.all() as cros_target[]).map((target) => [
      target.board,
      (getBrands.all(target.board) as cros_brand[]).map((brand) => brand.brand),
    ]) as Targets
  );
};

export default targetsAPI;
