# Elvyy, Free Tools + Blog with Built-in Admin

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Sanity (embedded admin panel).

## What's included

- **4 working tools**: Word Counter, QR Code Generator, Age Calculator, Unit Converter
- **Blog** that reads posts from Sanity once connected (shows 4 sample posts until then)
- **Admin panel built into the site** at `/admin`, once you write a blog post there and publish,
  it appears on `/blog` automatically within a minute
- Required pages: About, Contact, Privacy Policy, Terms of Service, all linked in header and footer
- Auto generated sitemap.xml and robots.txt

## One time setup

```bash
npm install
```

Create `.env.local` in the project root:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=wr9qd7c1
NEXT_PUBLIC_SANITY_DATASET=production
```

Run:
```bash
npm run dev -- --webpack
```

Visit http://localhost:3000 for the site, and http://localhost:3000/admin to log in and manage
blog posts (same Google account used on sanity.io).

## Deploy (free), single site, single domain

1. Push this whole folder to a GitHub repository.
2. Go to https://vercel.com, "Add New Project", import the repo.
3. Add the two environment variables above in Vercel: Project > Settings > Environment Variables.
4. Deploy.
5. In Vercel: Project > Settings > Domains, add `elvyy.com` and `www.elvyy.com`.
6. In Spaceship DNS settings:
   - **A record**: `@` to `76.76.21.21`
   - **CNAME record**: `www` to `cname.vercel-dns.com`

Once live, both `elvyy.com` and `elvyy.com/admin` work from the same deployment, no second site,
no second domain needed.

## Before applying for AdSense

- [ ] Publish at least 15 to 20 real blog posts through `/admin`
- [ ] Confirm Contact page emails are correct
- [ ] Site should be live for a few weeks with real content before applying

## Adding a new tool (requires code)

Tools are interactive code, not content, so they can't be added through `/admin`. Create a
component in `src/components/tools/`, register it in `src/lib/tools.ts`, and add a page at
`src/app/tools/<slug>/page.tsx` following the pattern of the existing four tools. Ask any time
and a new tool can be built.
