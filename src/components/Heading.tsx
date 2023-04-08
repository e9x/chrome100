import Head from "next/head";
import Link from "next/link";

const Heading = () => {
  return (
    <>
      <Head>
        <title>Chrome 100</title>
        <meta
          name="description"
          content="Chrome100 is a directory of recovery images for Google's operating system Chrome OS."
        />
        <meta name="og:image" content="/banner.webp" />
        <meta name="theme-color" content="#FAFAFA" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <h1>Chrome100</h1>
      <ul>
        <li>
          <Link href="/">Recovery Images</Link>
        </li>
        <li>
          <Link href="/info">Explanation</Link>
        </li>
        <li>
          <Link href="/guide">Walkthrough</Link>
        </li>
        <li>
          <Link href="https://github.com/e9x/chrome100">Source Code</Link>
        </li>
      </ul>
    </>
  );
};

export default Heading;
