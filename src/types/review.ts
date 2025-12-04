export interface Review {
  id: number;
  title: string;
  content: string;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ReviewCardProps = Pick<
  Review,
  "id" | "title" | "category" | "rating" | "images" | "content" | "tags"
>;
