import type { cros_target, cros_brand } from "chrome-versions";
import { render, h, Fragment } from "https://unpkg.com/preact@latest?module";
import { root } from "./root.js";

type BoardData = [target: cros_target, brands: cros_brand[]][];

const BoardPage = () => {
  const board = new URLSearchParams(location.search).get("board");

  if (!board)
    return (
      <>
        You must specify the <code>board</code> search parameter.
      </>
    );

  return (
    <p>
      Loading ChromeOS board <code>{board}</code>...
    </p>
  );
};

render(<BoardPage />, root);
