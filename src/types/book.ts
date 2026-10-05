export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  class: string;
  subject: string;
  category: string;
  author: string;
  cover: string;
  pdf: string;
  fileSize?: string;
  publishedDate?: string;
  featured: boolean;
  tags: string[];
}
