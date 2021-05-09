export interface Article {
  id?: string;
  title: string;
  media?: string;
  author?: string;
  date: string;
  img?: string;
  fullcontent?: string;
  epigraph?: string;
  excrept?: string;
  url?: string;
  tags?: Array<string>;
}