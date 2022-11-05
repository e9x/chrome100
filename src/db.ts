import Database from "better-sqlite3";
import { chromeDBPath } from "chrome-versions/db";

const db = new Database(chromeDBPath);

export default db;
