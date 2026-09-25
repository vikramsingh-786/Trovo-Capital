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
        src="/logo/BlackInk-Lane-Final-Logo-White.svg"
        alt="Black Lane Capital"
        width={1414}
        height={387}
        priority={priority}
        className="h-9 w-auto md:h-12"
      />
    </Link>
  );
}
