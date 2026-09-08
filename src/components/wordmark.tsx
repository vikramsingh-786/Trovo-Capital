import Image from "next/image";
import Link from "next/link";

/**
 * Trove wordmark.
 *
 * Renders the supplied brand lockup (icon + wordmark). The asset at
 * public/logo/trove-logo.webp is built by scripts/build-assets.py from the
 * owner-supplied assets/brand/logo.jpg, which is an opaque JPEG on near-white
 * paper: dropped straight onto the ivory ground it would show as a white box.
 * The build keys the paper out to transparency, trims the uneven padding so CSS
 * controls the optical alignment, and encodes it losslessly at the size its
 * largest on-screen use needs. The original is kept unmodified, outside
 * public/, as the source of record.
 *
 * A vector version would be better than any raster here — see README.
 *
 * The supplied artwork is near-black ink on transparency, which is invisible
 * on the dark ground the site now uses, so the `brandmark` utility inverts it
 * to white and un-inverts it under the light theme. See globals.css.
 *
 * `priority` because this is above the fold; with `images.unoptimized` (forced
 * by static export) next/image emits a plain <img> with the intrinsic
 * dimensions, which is what keeps the bar from shifting as the logo loads.
 */
export function Wordmark({
  className = "",
  priority = true,
}: {
  className?: string;
  /** The header instance is above the fold; the footer's is not. */
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center transition-opacity duration-swift ease-standard hover:opacity-70 ${className}`}
    >
      <Image
        src="/logo/trove-logo.webp"
        alt="Trove Capital"
        width={336}
        height={128}
        priority={priority}
        className="brandmark h-8 w-auto md:h-10"
      />
    </Link>
  );
}
