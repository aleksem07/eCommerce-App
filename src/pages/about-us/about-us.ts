import AboutUsView from "./about-us.view";
import TeamComponent from "@Components/team/team";

export default class AboutUsPage {
  private view: AboutUsView;
  team: TeamComponent;

  constructor() {
    this.view = new AboutUsView();
    this.team = new TeamComponent();
  }

  init() {
    this.view.render();
    this.team.init();
  }
}
