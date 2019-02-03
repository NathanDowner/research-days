export interface GeocodeResponse {
  results: [{
    address_components: [{}];
    formatted_address: string;
    geometry: {
      location: {
        lat: string;
        lng: string;
      };
    };

  }],
  status: string;
}