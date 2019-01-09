export interface Event {
  id: number;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  venue: string;
  speaker: string;
  description: string;
  location: {
    name: string;
    coords: {
      lat: number;
      lon: number;
    };
  };
}
