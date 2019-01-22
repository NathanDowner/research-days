export interface Event {
  id: string;
  start_date: string;
  title?: string;
  type: string;
  details: string;
  faculty?: string;
  department?: string;
  imgSrc: string;
  link: string;
  venue: string;
  coords?: {
    lat: number;
    lon: number;
  };
}
