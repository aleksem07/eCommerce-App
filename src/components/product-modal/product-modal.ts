import bootstrap from "bootstrap";
import ProductModalView from "./product-modal.view";

export default class ProductModalComponent {
  private view: ProductModalView;

  constructor() {
    this.view = new ProductModalView();
  }

  // openModal() {
  //   const modalInstance = new bootstrap.Modal(this.modalElement);
  //   modalInstance.show();
  // }

  // closeModal() {
  //   const modalInstance = new bootstrap.Modal(this.modalElement);
  //   modalInstance.hide();
  // }

  init() {
    return this.view.render();
  }
}
