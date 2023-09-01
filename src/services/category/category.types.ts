export interface Category {
  id: string;
  name: string;
  ancestors: { id: string }[];
}
