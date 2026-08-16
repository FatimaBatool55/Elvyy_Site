import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Articles" },
];

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/admin", label: "Admin" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-ink">elvyy<span className="text-sage">.</span></p>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">Free tools with no limits, and writing worth reading. Built to be useful first.</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-sage-deep">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Site</p>
            <ul className="mt-3 space-y-2 text-sm">
              {siteLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-sage-deep">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Elvyy. All rights reserved.</p>
          <p>Every tool on this site is free, with no usage limits.</p>
        </div>
      </div>
    </footer>
  );
}
