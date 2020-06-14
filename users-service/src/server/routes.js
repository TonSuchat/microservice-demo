import { User, UserSession } from "../db/models";
import generateUUID from "../helpers/generateUUID";
import hashPassword from "../helpers/hashPassword";
import passwordCompareSync from "../helpers/passwordCompareSync";
import { addHours } from "date-fns";

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = (app) => {
  app.post("/sessions", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid parameters"));
    }
    try {
      const user = await User.findOne({
        attributes: {},
        where: {
          email: req.body.email,
        },
      });
      if (!user) return next(new Error("Invalid email!"));
      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(Error("Invalid password!"));
      }

      // create user session right here
      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
      const sessionToken = generateUUID();
      const userSession = await UserSession.create({
        id: sessionToken,
        userId: user.id,
        expiredAt: expiresAt,
      });
      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    if (!req.params.sessionId) return next(new Error("Invalid parameter"));
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);
      if (!userSession) return next(new Error("Invalid session id"));
      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    if (!req.params.sessionId) return next(new Error("Invalid parameter"));
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);
      if (!userSession) return next(new Error("Not found user session"));
      await userSession.destroy();
      return res.end();
    } catch (error) {
      return next(error);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid parameters"));
    }
    try {
      const newUser = await User.create({
        email: req.body.email,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
      });
      return res.json(newUser);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/users", async (req, res, next) => {
    const users = await User.findAll();
    return res.json(users);
  });

  app.get("/users/:userId", async (req, res, next) => {
    if (!req.params.userId) return next(new Error("Invalid parameter"));
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) return next(new Error("User not found"));
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  });
};

export default setupRoutes;
