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

const getTargets = db.prepare<[]>("SELECT * FROM cros_target;");
const getBrands = db.prepare<[board: string]>(
  "SELECT * FROM cros_brand WHERE board = ?;"
);

type HomeData = [target: cros_target, brands: cros_brand[]][];

server.get("/home", (req, reply) => {
  const data: HomeData = [];

  for (const target of getTargets.all() as cros_target[]) {
    data.push([target, getBrands.all(target.board)]);
  }

  reply.send(data);
});

const getTarget = db.prepare<[board: string]>(
  "SELECT * FROM cros_target WHERE board = ?;"
);
const getRecoveryImages = db.prepare<[board: string]>(
  "SELECT * FROM cros_recovery_image WHERE board = ?;"
);

interface BoardData {
  target: cros_target;
  images: cros_recovery_image_db[];
}

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

    reply.send({
      target,
      images,
    } as BoardData);
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
