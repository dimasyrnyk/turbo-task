import { store } from "..";
import { refreshToken } from "../store/activeuser/actions";

class ClientAPI {
  static async originalRequest(url: string, config: object) {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  }

  static async interceptedFetch(url: string, config: any = {}) {
    const token = store.getState().activeUser.token;
    let newConfig;

    if (!config) {
      newConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };
    } else {
      newConfig = {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };
    }

    let { response, data } = await ClientAPI.originalRequest(url, newConfig);

    if (response.status === 401) {
      const authTokens = await store.dispatch<any>(refreshToken()); // Оновлюємо токен за допомогою екшена з Redux
      const newAuthConfig = {
        ...newConfig,
        headers: {
          ...newConfig.headers,
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      };

      const newResponse = await ClientAPI.originalRequest(url, newAuthConfig);
      response = newResponse.response;
      data = newResponse.data;
    }

    return { response, data };
  }
}

export default ClientAPI;
