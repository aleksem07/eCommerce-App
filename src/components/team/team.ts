import TeamView from "./team.view";
import LinkComponent from "@Components/link/link";

export default class TeamComponent {
  private view: TeamView;
  private gitHubLinkMentor: HTMLElement;
  private gitHubLinkTeamLead: HTMLElement;
  private gitHubLinkDeveloperFirst: HTMLElement;
  private gitHubLinkDeveloperSecond: HTMLElement;

  constructor() {
    const gitHubLinks = [
      (this.gitHubLinkMentor = this.createGitHubLink("nataliagulko")),
      (this.gitHubLinkTeamLead = this.createGitHubLink("johngaalt")),
      (this.gitHubLinkDeveloperFirst = this.createGitHubLink("nikitastarmoussov")),
      (this.gitHubLinkDeveloperSecond = this.createGitHubLink("aleksem07")),
    ];

    this.view = new TeamView([...gitHubLinks]);
  }

  private createGitHubLink(gitHubName: string) {
    const link = new LinkComponent({
      href: `https://github.com/${gitHubName}`,
      text: gitHubName,
      classes: ["bi-github", "text-decoration-none"],
    }).init();
    link.setAttribute("target", "_blank");

    return link;
  }

  init() {
    return this.view.render();
  }
}
