import ClientBuilderService from "@Services/client-builder/client-builder";

export default class ProductService extends ClientBuilderService {
  async getAll() {
    const products = await this.apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .products()
      .get()
      .execute();
    console.log(products);
  }
}
