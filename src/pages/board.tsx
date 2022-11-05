import type { BoardData } from "./api/board";
import type { cros_recovery_image_db } from "chrome-versions";
import {
  getRecoveryURL,
  parsePlatformVersion,
  parseChromeVersion,
} from "chrome-versions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heading from "../components/Heading";

type SortOrder = "lastModified" | "chrome" | "platform";

const sortVersions = (a: number[], b: number[]) => {
  if (a.length !== b.length) throw new Error("array length mismatch");
  for (let i = 0; i < a.length; i++) if (a !== b) return a[i] > b[i] ? 1 : -1;
  return b.length - a.length;
};

const sortImages = (
  sortOrder: SortOrder,
  sortReverse: boolean,
  images: Readonly<cros_recovery_image_db[]>
) => {
  const sorted = [...images];

  sorted.sort((a, b) => {
    switch (sortOrder) {
      case "chrome": {
        const av = parseChromeVersion(a.chrome);
        const bv = parseChromeVersion(b.chrome);
        return sortVersions(av, bv);
      }
      case "platform": {
        const av = parsePlatformVersion(a.platform);
        const bv = parsePlatformVersion(b.platform);
        return sortVersions(av, bv);
      }
      case "lastModified":
        return (
          new Date(a.last_modified).getTime() -
          new Date(b.last_modified).getTime()
        );
      default:
        throw new Error(`Unknown order ${sortOrder}`);
    }
  });

  if (sortReverse) sorted.reverse();

  return sorted;
};

const BoardPage = () => {
  const router = useRouter();
  const board = router.query["board"];
  const [boardData, setBoardData] = useState<null | BoardData>(null);
  const [sortReverse, setSortReverse] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("lastModified");

  useEffect(() => {
    if (typeof board !== "string") return;

    const controller = new AbortController();

    (async () => {
      const data = await fetch(
        `/api/board?board=${encodeURIComponent(board)}`,
        {
          signal: controller.signal,
        }
      );
      if (!data.ok) throw new Error("Failure fetching home data.");
      setBoardData(await data.json());
    })().catch(console.error);

    return () => {
      controller.abort();
    };
  }, [board]);

  if (typeof board !== "string")
    return (
      <p>
        You must specify the <code>board</code> search parameter.
      </p>
    );

  return (
    <>
      <Heading />
      {boardData === null ? (
        <p>
          Loading Chrome OS board <code>{board}</code>...
        </p>
      ) : (
        <>
          <h1>
            Chrome OS board <code>{board}</code>
          </h1>
          <h2>Brands</h2>
          <ul>
            {boardData.brands.map((target, i) => (
              <li key={i}>{target.brand}</li>
            ))}
          </ul>
          <h2>Recovery Images</h2>
          <h3>Sort</h3>
          <select
            onChange={(e) => setSortOrder(e.currentTarget.value as SortOrder)}
          >
            <option value="lastModified">Last Modified</option>
            <option value="chrome">Chrome Version</option>
            <option value="platform">Platform Version</option>
          </select>
          <br />
          <label>
            <input
              type="checkbox"
              onChange={(e) => setSortReverse(e.currentTarget.checked)}
            />{" "}
            Reverse
          </label>
          <h3>Boards</h3>
          {boardData.images.length ? (
            <table>
              <thead>
                <th>Platform</th>
                <th>Chrome</th>
                <th>Modified</th>
                <th />
              </thead>
              <tbody>
                {sortImages(sortOrder, sortReverse, boardData.images).map(
                  (img, i) => (
                    <tr key={i}>
                      <td>{img.platform}</td>
                      <td>{img.chrome}</td>
                      <td>{img.last_modified}</td>
                      <td>
                        <a href={getRecoveryURL(img)}>Download</a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>
              No recovery images found. Either this board name has no images
              available or it has not been scraped yet.
            </p>
          )}
        </>
      )}
    </>
  );
};

export default BoardPage;
