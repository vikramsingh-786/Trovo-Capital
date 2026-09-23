import Image from "next/image";
import Link from "next/link";

export function Wordmark({
  className = "",
  priority = true,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center transition-opacity duration-swift ease-standard hover:opacity-70 ${className}`}
    >
      <Image
        src="/logo/blackink-capital.png"
        alt="Black Ink Capital"
        width={2846}
        height={1029}
        priority={priority}
        className="brandmark h-9 w-auto md:h-12"
      />
    </Link>
  );
}
