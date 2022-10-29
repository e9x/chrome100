import type {
  cros_target,
  cros_brand,
  cros_recovery_image_db,
} from "chrome-versions";

export type HomeData = [target: cros_target, brands: cros_brand[]][];

export interface BoardData {
  target: cros_target;
  images: cros_recovery_image_db[];
  brands: cros_brand[];
}
