import { ViewBuilder } from "@Interfaces/view-builder";

export default class RsLinkView extends ViewBuilder {
  private RSLink: HTMLLinkElement;
  private RSLogo: HTMLImageElement;

  constructor() {
    super();
    this.RSLink = this.createElement("a", {
      classes: ["text-decoration-none"],
    });
    this.RSLink.href = "https://rs.school/js/";
    this.RSLink.target = "_blank";
    this.RSLogo = this.createElement("img");
    this.RSLogo.width = 100;
    this.RSLogo.src = "https://rs.school/images/rs_school_js.svg";
    this.RSLink.append(this.RSLogo);
  }

  render() {
    this.appendTo("#about-us", this.RSLink);
  }
}
