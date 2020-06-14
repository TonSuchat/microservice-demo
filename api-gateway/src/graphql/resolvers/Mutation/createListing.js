import ListingService from "../../../adapters/ListingsService";

const createListingResolver = async (obj, { title, description }) => {
  return await ListingService.createListing({ title, description });
};

export default createListingResolver;
