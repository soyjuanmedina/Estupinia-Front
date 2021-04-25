export interface Article {
  title: string;
  id?: number;
  media?: string;
  writer?: string;
  date: string;
  img?: string;
  fullcontent?: string;
  epigraph?: string;
  excrept?: string;
  url?: string;
  premium: boolean;
}