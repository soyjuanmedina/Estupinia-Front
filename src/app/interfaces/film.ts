export interface Film {
  title?: string;
  id: number;
  director?: Array<string>;
  writer?: Array<string>;
  casting?: Array<string>;
  img?: string;
  synopsis?: string;
}