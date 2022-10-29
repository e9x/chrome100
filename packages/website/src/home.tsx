import type { HomeData } from "backend";
import { render, h, Fragment } from "https://unpkg.com/preact@latest?module";
import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import { apiURL } from "./api.js";
import { root } from "./root.js";

const HomePage = () => {
  const [targets, setTargets] = useState<null | HomeData>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const data = await fetch(new URL("home", apiURL), {
        signal: controller.signal,
      });
      if (!data.ok) throw new Error("Failure fetching home data.");
      setTargets(await data.json());
    })().catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  return targets === null ? (
    <p>Loading Chrome OS targets...</p>
  ) : (
    <>
      <h1>Chrome OS Recovery Images</h1>
      <table>
        <thead>
          <th>Board</th>
          <th>Brands</th>
          <th />
        </thead>
        <tbody>
          {targets.map((target, i) => (
            <tr key={i}>
              <td>
                <code>{target[0].board}</code>
              </td>
              <td>{target[1].map((target) => target.brand).join(", ")}</td>
              <td>
                <a
                  style={{ whiteSpace: "nowrap" }}
                  href={`/board.html?board=${encodeURIComponent(
                    target[0].board
                  )}`}
                >
                  See more
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

render(<HomePage />, root);
