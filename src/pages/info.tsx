import Link from "next/link";
import Heading from "../components/Heading";

const InfoPage = () => {
  return (
    <>
      <Heading />
      <h1>Chrome100 Information</h1>
      <h2>What is Chrome100?</h2>
      <p>
        Chrome100 is a directory of recovery images for Google&apos;s operating
        system Chrome OS.
      </p>
      <h2>
        For what purpose are you collecting thousands of Chrome OS builds!?
      </h2>
      <p>
        Chrome OS recovery images are a necessity for any IT admins or a Chrome
        OS hobbyist. Chrome OS recovery images can be used to repair broken
        installs of Chrome OS, bypassing being pinned to an outdated version of
        Chrome OS, or more desirably: downgrading to an earlier version of
        Chrome OS.
      </p>
      <h2>Why downgrade?</h2>
      <p>
        Downgrading Chrome OS may be done in order to continue using a deleted
        feature, patched bug, or to avoid a new feature. This opens the door to
        many patched CVEs and exploits being used, despite being patched in
        newer versions of Chrome OS.
      </p>
      <h2>Will these recovery images work on my managed Chromebook?</h2>
      <p>
        Yes. Although your IT admin may notice you&apos;re on an earlier version
        of Chrome OS (which often goes unnoticed).
      </p>
      <h2>Where do I get started?</h2>
      <p>
        See the <Link href="/guide">guide</Link>.
      </p>
    </>
  );
};

export default InfoPage;
