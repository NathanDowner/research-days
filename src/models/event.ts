export interface Event {
  nid: string;
  title: string;
  researcher_name: string;
  date: string;
  abstract: string;
  path: string; // this field is used for QR generation
  imgSrc: string;
  location: {
    name: string;
    coords: {
      lat: number;
      lon: number;
    };
  };
}
