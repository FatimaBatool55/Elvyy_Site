import { client, isSanityConfigured } from "./client";

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  _type?: "image";
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: unknown;
  coverImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  noIndex?: boolean;
};

const postFields = `
  _id, title, "slug": slug.current, excerpt, category, publishedAt, body,
  coverImage{alt, asset},
  seoTitle, seoDescription, focusKeyword, noIndex
`;

const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){ ${postFields} }`;
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`;

export async function getSanityPosts(): Promise<SanityPost[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch(allPostsQuery);
  } catch {
    return [];
  }
}

export async function getSanityPost(slug: string): Promise<SanityPost | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}
