export interface Location {
  "id": number
  "type": string,
  "geometry": {
    "type": string,
    "coordinates": [number, number]
  },
  "properties": {
      "name": string,
      "categories": [],
      "phone_number": string,
      "address": string
      "parish": {
        "id": number,
        "name": string
      }
  }
}