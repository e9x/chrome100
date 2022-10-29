import type { BoardData } from "backend";
import type { cros_recovery_image_db } from "https://unpkg.com/chrome-versions@latest";
import {
  getRecoveryURL,
  parsePlatformVersion,
  parseChromeVersion,
} from "https://unpkg.com/chrome-versions@latest";
import { render, h, Fragment } from "https://unpkg.com/preact@latest?module";
import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import { apiURL } from "./api.js";
import { root } from "./root.js";

type SortOrder = "lastModified" | "chrome" | "platform";

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
        return bv[0] <= av[0] &&
          bv[1] <= av[1] &&
          bv[2] <= av[2] &&
          bv[3] <= av[3]
          ? 1
          : 0;
      }
      case "platform": {
        const av = parsePlatformVersion(a.platform);
        const bv = parsePlatformVersion(b.platform);
        return bv[0] <= av[0] && bv[1] <= av[1] && bv[2] <= av[2] ? 1 : 0;
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
  const board = new URLSearchParams(location.search).get("board");
  const [boardData, setBoardData] = useState<null | BoardData>(null);
  const [sortReverse, setSortReverse] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("lastModified");

  useEffect(() => {
    if (!board) return;

    const controller = new AbortController();

    (async () => {
      const data = await fetch(
        new URL(`board?board=${encodeURIComponent(board)}`, apiURL),
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

  if (!board)
    return (
      <p>
        You must specify the <code>board</code> search parameter.
      </p>
    );

  return boardData === null ? (
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
  );
};

render(<BoardPage />, root);
