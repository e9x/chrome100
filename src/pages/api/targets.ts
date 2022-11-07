import type { NextApiRequest, NextApiResponse } from "next";
import type { cros_brand, cros_target } from "chrome-versions";
import { getBrands, getTargets } from "../../db";

export type TargetData = {
  target: cros_target["board"];
  brands: cros_brand["brand"][];
}[];

const targetsAPI = (req: NextApiRequest, res: NextApiResponse) => {
  const targetData: TargetData = (getTargets.all() as cros_target[]).map(
    (target) => ({
      target: target.board,
      brands: (getBrands.all(target.board) as cros_brand[]).map(
        (brand) => brand.brand
      ),
    })
  );

  res.json(targetData);
};

export default targetsAPI;
