import { Listing } from "../db/models";

const setupRoutes = (app) => {
  app.get("/listings", async (req, res, next) => {
    const listings = await Listing.findAll();
    return res.json(listings);
  });

  app.post("/listings", async (req, res, next) => {
    if (!req.body.title || !req.body.description)
      return next(new Error("Invalid parameters."));
    try {
      const listing = await Listing.create({
        title: req.body.title,
        description: req.body.description,
      });
      return res.json(listing);
    } catch (error) {
      return next(error);
    }
  });
};

export default setupRoutes;
