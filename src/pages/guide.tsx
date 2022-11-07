import Image from "next/image";
import Link from "next/link";
import Heading from "../components/Heading";

const GuidePage = () => {
  return (
    <>
      <Heading />
      <h1>Chrome100 Recovery Image Guide</h1>
      <h2>Usage</h2>
      <p>
        Chrome OS recovery images come in a <code>.zip</code> file.
        <br />
        You will need:
      </p>
      <ol>
        <li>USB drive with at least 8 GB of storage</li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm">
            Chromebook Recovery Utility
          </a>{" "}
          / DD (*NIX)
        </li>
      </ol>
      <h2>Downloading a recovery image</h2>
      <ol>
        <li>
          Go to the <Link href="/">list of recovery images</Link>
        </li>
        <li>
          Scroll or use <kbd>CTRL</kbd> + <kbd>F</kbd> to find your board name
        </li>
        <li>Click on &quot;See more&quot;</li>
        <li>Click on any of the &quot;Download&quot; links</li>
      </ol>
      <h2>Finding the right recovery image</h2>
      <p>
        Recovery images are built for individual Chromebook boards. In order to
        download the appropriate recovery image, you will need to find your
        Chromebook&apos;s board name.
        <br />
        To find your board name, visit the (built-in) website{" "}
        <code>chrome://version</code> and find the &quot;<b>Platform:</b>&quot;
        row.
      </p>
      <p>It should look something like:</p>
      <ul>
        <li>
          3428.193.0 (Official Build) stable-channel <b>stumpy</b>
        </li>
        <li>
          8530.93.0 (Official Build) stable-channel <b>reks</b>
        </li>
      </ul>
      <p>
        The word (in bold) after &quot;stable-channel&quot; is your board name.
        For example, the board name of the Chromebook in the following image
        would be &quot;reks&quot;.
      </p>
      <Image
        alt="Chrome OS reks version page"
        width={1078}
        height={296}
        src="/platform-trimmed.png"
      />
      <h2>Burning the zip file file to a USB with DD (unix)</h2>
      <ol>
        <li>Extract the recovery image from your downloaded zip.</li>
      </ol>
      <pre>
        $ unzip
        ./chromeos_8530.93.0_x86-mario_recovery_stable-channel_mario-mp-v3.bin.zip
        <br />
        &gt; inflating:
        chromeos_8530.93.0_x86-mario_recovery_stable-channel_mario-mp-v3.bin #
        this is the filename of the raw recovery image
      </pre>
      <ol start={2}>
        <li>Plug in your USB.</li>
        <li>Find your USB&apos;s block device.</li>
      </ol>
      <p>
        Run fdisk (may require root privillages depending on your udev rules.
      </p>
      <pre>$ fdisk -l</pre>
      <p>
        Look through the <code>Disk /dev/sdX:</code> lines until you find a disk
        that matches the size of your USB or contains familiar paritions.
        Usually the block device will start with <code>/dev/sd</code>, for
        example mine will be <code>/dev/sdb</code>. The last letter is the ID of
        the block device.
      </p>
      <ol start={4}>
        <li>
          Write the recovery image using DD (may require root privillages
          depending on your udev rules)
        </li>
      </ol>
      <blockquote>
        ⚠️ DD is a destructive command and can erase your files when used on the
        wrong drive.
      </blockquote>
      <ul>
        <li>
          The blocksize is recommended to be set to <code>4194304</code>.
        </li>
        <li>
          <code>conv=sync</code> is recommended to be set, especially when the
          USB or your storage may be faulty. This will allow the image to be
          corrupt.
        </li>
        <li>
          <code>status=progress</code> will output the progress.
        </li>
        <li>
          Replace <code>/dev/sdX</code> with your USB&apos;s block device. (e.g.
          <code>of=&quot;/dev/sdb&quot;</code>).
        </li>
        <li>
          Replace <code>PATH_TO_RECOVERY_IMAGE</code> with the path to your
          recovery image bin (e.g.
          <code>
            if=~/Downloads/chromeos_8530.93.0_x86-mario_recovery_stable-channel_mario-mp-v3.bin
          </code>
          ).
        </li>
      </ul>
      <pre>
        $ dd bs=4194304 of=/dev/sdX if=PATH_TO_RECOVERY_IMAGE.bin conv=sync
        status=progress
      </pre>
      <p>The complete command will look like:</p>
      <pre>
        $ dd bs=4194304 of=/dev/sdb
        if=~/Downloads/chromeos_8530.93.0_x86-mario_recovery_stable-channel_mario-mp-v3.bin
        conv=sync status=progress
      </pre>
      <h2>Burning the zip file file to a USB Chromebook Recovery Utility</h2>
      <ol>
        <li>
          Open the{" "}
          <a href="https://chrome.google.com/webstore/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm">
            Chromebook Recovery Utility
          </a>
        </li>
        <li>
          Click on the gears button in the top right of the window and select
          &quot;Use local image&quot;
        </li>
        <li>
          Navigate to the <code>.zip</code> recovery image you downloaded.
        </li>
        <li>Select your USB drive as prompted by the window.</li>
        <li>Select create now.</li>
      </ol>
      <h2>Restoring Chrome OS from a USB drive</h2>
      <ol>
        <li>
          Press <kbd>ESC</kbd> + <kbd>⟳</kbd> + <kbd>⏻</kbd> to enter the
          recovery menu.
        </li>
        <li>
          Plug in your USB drive you previously burnt a recovery image to.
        </li>
        <li>Press enter once the menu is done verifying your USB drive.</li>
        <li>Once finished, unplug your USB drive.</li>
      </ol>
    </>
  );
};

export default GuidePage;
