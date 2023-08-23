import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";

export default class ProductService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getAll() {
    try {
      const token = await this.authService.retrieveToken();

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
    } catch (error) {
      console.error("ERRORRRR", error);
    }
  }
}
