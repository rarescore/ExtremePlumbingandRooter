import meta from "./articles-meta.json";
import { coverFor } from "./article-covers";

export type ArticleCard = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
};

export const articleCards: ArticleCard[] = (meta as Omit<ArticleCard, "image">[]).map((item) => ({
  ...item,
  image: coverFor(item.slug, item.title),
}));
