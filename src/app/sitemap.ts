import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { posts as staticPosts } from "@/lib/posts";
import { getSanityPosts } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://elvyy.com";
  const staticRoutes = ["", "/tools", "/blog", "/about", "/contact", "/privacy-policy", "/terms"];

  const sanityPosts = isSanityConfigured ? await getSanityPosts() : [];
  const blogEntries = isSanityConfigured
    ? sanityPosts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: new Date(p.publishedAt),
      }))
    : staticPosts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: new Date(p.date),
      }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
    })),
    ...tools.map((t) => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: new Date(),
    })),
    ...blogEntries,
  ];
}
