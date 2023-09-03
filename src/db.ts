import Database from "better-sqlite3";
import { cros_brand } from "chrome-versions";
import { chromeDBPath } from "chrome-versions/db";

const db = new Database(chromeDBPath);
export default db;

export const getTargets = db.prepare<[]>(
  "SELECT * FROM cros_target ORDER BY board COLLATE NOCASE ASC;",
);
export const getBrands = db.prepare<[board: cros_brand["board"]]>(
  "SELECT * FROM cros_brand WHERE board = ? ORDER BY brand COLLATE NOCASE ASC;",
);
export const getTarget = db.prepare<[board: string]>(
  "SELECT * FROM cros_target WHERE board = ? ORDER BY board COLLATE NOCASE ASC;",
);
export const getRecoveryImages = db.prepare<[board: string]>(
  "SELECT * FROM cros_recovery_image WHERE board = ?;",
);
