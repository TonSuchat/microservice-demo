import UsersService from "../../../adapters/UsersService";

const usersResolver = async () => {
  return await UsersService.fetchAllUsers();
};

export default usersResolver;
