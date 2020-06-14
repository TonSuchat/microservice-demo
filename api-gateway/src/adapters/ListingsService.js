import got from "got";

const LISTINGS_SERVICE_URI = "http://listings-service:7100";

export default class ListingsService {
  static async fetchAllListings() {
    return await got.get(`${LISTINGS_SERVICE_URI}/listings`).json();
  }
  static async createListing({ title, description }) {
    return await got
      .post(`${LISTINGS_SERVICE_URI}/listings`, {
        json: { title, description },
      })
      .json();
  }
}
