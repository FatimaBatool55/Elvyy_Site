import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 text-ink-soft">
        The page you&apos;re looking for may have moved or been removed.
        Here are some places to go instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-sage-deep px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/tools"
          className="rounded-lg border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-soft hover:border-sage hover:text-sage-deep"
        >
          Browse tools
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-soft hover:border-sage hover:text-sage-deep"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
