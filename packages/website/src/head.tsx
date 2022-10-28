import { render, Fragment, h } from "https://unpkg.com/preact@latest?module";
import { head } from "./root.js";

const Head = () => {
  return (
    <>
      <h1>Chrome100</h1>
      <ul>
        <li>
          <a href="/info.html">Information</a> ("What is Chrome100", "How can I
          use this?")
        </li>
        <li>
          <a href="/guide.html">Guide</a> (Walkthrough of using these recovery
          images on your chromebook)
        </li>
        <li>
          <a href="https://github.com/sysce/chrome100">GitHub</a> (Source Code)
        </li>
      </ul>
      <br />
    </>
  );
};

render(<Head />, head);
