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
        width={1304}
        height={432}
        priority={priority}
        className="brandmark h-8 w-auto md:h-10"
      />
    </Link>
  );
}
