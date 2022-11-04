import type { HomeData, BoardData } from "./types";
import Database from "better-sqlite3";
import type {
  cros_target,
  cros_brand,
  cros_recovery_image_db,
} from "chrome-versions";
import { chromeDBPath } from "chrome-versions/db";
import fastify from "fastify";

const server = fastify();

const db = new Database(chromeDBPath);

const getTargets = db.prepare<[]>(
  "SELECT * FROM cros_target ORDER BY board COLLATE NOCASE ASC;"
);
const getBrands = db.prepare<[board: string]>(
  "SELECT * FROM cros_brand WHERE board = ? ORDER BY brand COLLATE NOCASE ASC;"
);

server.get("/home", (req, reply) => {
  const homeData: HomeData = [];

  for (const target of getTargets.all() as cros_target[])
    homeData.push([target, getBrands.all(target.board)]);

  reply.send(homeData);
});

const getTarget = db.prepare<[board: string]>(
  "SELECT * FROM cros_target WHERE board = ? ORDER BY board COLLATE NOCASE ASC;"
);
const getRecoveryImages = db.prepare<[board: string]>(
  "SELECT * FROM cros_recovery_image WHERE board = ?;"
);

server.get(
  "/board",
  {
    schema: {
      querystring: {
        properties: {
          board: {
            type: "string",
          },
        },
        required: ["board"],
        type: "object",
      },
    },
  },
  (req, reply) => {
    const { board } = req.query as { board: string };

    const target = getTarget.get(board) as cros_target;
    const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
    const brands = getBrands.all(board) as cros_brand[];

    const boardData: BoardData = {
      target,
      images,
      brands,
    };

    reply.send(boardData);
  }
);

const port = parseInt(process.env.PORT || process.argv[2] || "80");

server.listen(
  {
    port,
  },
  (err, url) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }

    console.log("API accessible from", url);
  }
);
