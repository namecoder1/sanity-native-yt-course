import { PortableTextBlock } from "@portabletext/types";

export type Post = {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  views?: number;
  category?: string;
  author?: string;
  text?: PortableTextBlock[];
};
