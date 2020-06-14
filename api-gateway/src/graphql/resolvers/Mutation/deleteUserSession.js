import UsersService from "../../../adapters/UsersService";

const deleteUserSessionResolver = async (obj, { sessionId }) => {
  if (await UsersService.deleteUserSession({ sessionId })) {
    context.res.clearCookie("userSessionId");
  }
  return true;
};

export default deleteUserSessionResolver;
