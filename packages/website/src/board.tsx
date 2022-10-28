import type { cros_target, cros_recovery_image_db } from "chrome-versions";
import { render, h } from "https://unpkg.com/preact@latest?module";
import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import { apiURL } from "./api.js";
import { root } from "./root.js";

interface BoardData {
  target: cros_target;
  images: cros_recovery_image_db[];
}

const BoardPage = () => {
  const board = new URLSearchParams(location.search).get("board");
  const [boardData, setBoardData] = useState<null | BoardData>(null);

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
      Loading ChromeOS board <code>{board}</code>...
    </p>
  ) : (
    <table>
      <thead>
        <th>Board</th>
        <th>Brands</th>
        <th />
      </thead>
      <tbody />
    </table>
  );
};

render(<BoardPage />, root);
