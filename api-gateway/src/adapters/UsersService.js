import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

export default class UsersService {
  static async fetchAllUsers() {
    return await got.get(`${USERS_SERVICE_URI}/users`).json();
  }

  static async fetchUser({ userId }) {
    return await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
  }

  static async createUser({ email, password }) {
    return await got
      .post(`${USERS_SERVICE_URI}/users`, {
        json: { email, password },
      })
      .json();
  }

  static async createUserSession({ email, password }) {
    return await got
      .post(`${USERS_SERVICE_URI}/sessions`, {
        json: { email, password },
      })
      .json();
  }

  static async fetchUserSession({ sessionId }) {
    const userSession = await got.get(
      `${USERS_SERVICE_URI}/sessions/${sessionId}`,
    ).json();
    return userSession;
  }

  static async deleteUserSession({ sessionId }) {
    return await got.delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();
  }
}
