import UsersService from "../adapters/UsersService";

const injectSession = async (req, res, next) => {
  if (req.cookies.userSessionId) {
    try {
      const userSession = await UsersService.fetchUserSession(
        { sessionId: req.cookies.userSessionId },
      );
      res.locals.userSession = userSession;
    } catch (error) {
      return next();
    }
  }
  return next();
};

export default injectSession;
