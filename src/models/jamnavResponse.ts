import { Location } from "./location";

export interface JamnavResponse {
  "type": string,
  "count": 300,
  "next": string,
  "previous": null,
  "features": [Location]
}