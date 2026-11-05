import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/70 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl tracking-tight text-ink"
        >
          <Image
            src="/logo.png"
            alt="Elvyy"
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          elvyy<span className="text-sage">.</span>
        </Link>
        {/* baaki nav ka jo bhi code aapke paas hai wo yahan rakhein */}
      </div>
    </header>
  );
}
