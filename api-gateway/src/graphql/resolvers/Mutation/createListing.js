import ListingService from "../../../adapters/ListingsService";

const createListingResolver = async (obj, { title, description }, context) => {
  if (!context.res.locals.userSession) throw new Error("Not logged in");
  return await ListingService.createListing({ title, description });
};

export default createListingResolver;
