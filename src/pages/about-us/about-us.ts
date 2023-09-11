import RsLinkComponent from "@Components/rs-link/rs-link";
import AboutUsView from "./about-us.view";
import TeamComponent from "@Components/team/team";

export default class AboutUsPage {
  private view: AboutUsView;
  team: TeamComponent;
  private link: RsLinkComponent;

  constructor() {
    this.view = new AboutUsView();
    this.team = new TeamComponent();
    this.link = new RsLinkComponent();
  }

  init() {
    this.view.render();
    this.team.init();
    this.link.init();
  }
}
