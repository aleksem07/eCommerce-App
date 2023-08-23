import AuthService from "@Services/auth/auth";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import ClientBuilderService from "@Services/client-builder/client-builder";

export default class ProductService extends ClientBuilderService {
  authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getAll() {
    let token = localStorage.getItem(AUTH_TOKEN_LS);

    if (!token) {
      const result = await this.authService.getAnonymousToken();

      if (result.data?.access_token) {
        token = result.data?.access_token;
      }
    }

    if (token) {
      const { body } = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .get({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .execute();

      return body;
    }
  }
}
