import type {
  cros_brand,
  cros_recovery_image_db,
  cros_target,
} from "chrome-versions";
import {
  getRecoveryURL,
  parsePlatformVersion,
  parseChromeVersion,
} from "chrome-versions";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Heading from "../components/Heading";
import { getBrands, getRecoveryImages, getTarget } from "../db";

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

enum BoardError {
  BadRequest,
  NotFound,
}

interface ErrorProps {
  error: BoardError;
}

interface DataProps {
  board: string;
  images: cros_recovery_image_db[];
  brands: cros_brand["brand"][];
}

type Props = ErrorProps | DataProps;

const isErrorProps = (props: Props): props is ErrorProps =>
  "error" in (props as Partial<ErrorProps>);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  let { board } = query;
  if (!board)
    return {
      props: {
        error: BoardError.BadRequest,
      },
    };
  if (Array.isArray(board)) board = board[0];

  const target = getTarget.get(board) as cros_target | undefined;

  if (!target)
    return {
      props: {
        error: BoardError.NotFound,
      },
    };

  const images = getRecoveryImages.all(board) as cros_recovery_image_db[];
  const brands = getBrands.all(board) as cros_brand[];

  return {
    props: {
      board,
      images: images,
      brands: brands.map((brand) => brand.brand),
    },
  };
};

const BoardPage: NextPage<Props> = (props) => {
  const [sortReverse, setSortReverse] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("lastModified");

  if (isErrorProps(props))
    switch (props.error) {
      case BoardError.BadRequest:
        return (
          <>
            <Heading />
            <p>
              Bad request. (Specify the <code>?board=</code> parameter)
            </p>
          </>
        );
      case BoardError.NotFound:
        return (
          <>
            <Heading />
            <p>Unknown board.</p>
          </>
        );
    }

  const { board, brands, images } = props;

  return (
    <>
      <Heading />
      <h1>
        Chrome OS board <code>{board}</code>
      </h1>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand, i) => (
          <li key={i}>{brand}</li>
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
      {images.length ? (
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Chrome</th>
              <th>Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sortImages(sortOrder, sortReverse, images).map((img, i) => (
              <tr key={i}>
                <td>{img.platform}</td>
                <td>{img.chrome}</td>
                <td>{img.last_modified}</td>
                <td>
                  <a href={getRecoveryURL(img)}>Download</a>
                </td>
              </tr>
            ))}
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

export default BoardPage;
