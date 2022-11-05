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
          <Link href="/info">Information</Link> (&quot;What is Chrome100&quot;,
          &quot;How can I use this?&quot;)
        </li>
        <li>
          <Link href="/guide">Guide</Link> (Walkthrough of using these recovery
          images on your chromebook)
        </li>
        <li>
          <Link href="https://github.com/e9x/chrome100">GitHub</Link> (Source
          Code)
        </li>
      </ul>
    </>
  );
};

export default Heading;
