import type { Targets } from "./api/targets";
import { useEffect, useState } from "react";
import Link from "next/link";
import Heading from "../components/Heading";

const HomePage = () => {
  const [targets, setTargets] = useState<null | Targets>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const data = await fetch("/api/targets", {
        signal: controller.signal,
      });
      if (!data.ok)
        throw new Error(`The response was not OK (got ${data.status})`);
      setTargets(await data.json());
    })().catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Heading />
      {targets === null ? (
        <p>Loading Chrome OS targets...</p>
      ) : (
        <>
          <h1>Chrome OS Recovery Images</h1>
          <table>
            <thead>
              <tr>
                <th>Board</th>
                <th>Brands</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {targets.map((target, i) => (
                <tr key={i}>
                  <td>
                    <code>{target[0].board}</code>
                  </td>
                  <td>{target[1].map((target) => target.brand).join(", ")}</td>
                  <td>
                    <Link
                      style={{ whiteSpace: "nowrap" }}
                      href={`/board?board=${encodeURIComponent(
                        target[0].board
                      )}`}
                    >
                      See more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default HomePage;
