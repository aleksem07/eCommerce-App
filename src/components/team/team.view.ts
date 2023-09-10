import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";
import mentorImage from "assets/images/team/natalia.png";
import teamLeadImage from "assets/images/team/anton.png";
import createDeveloperFirst from "assets/images/team/nikita.png";
import createDeveloperSecond from "assets/images/team/aleksey.png";
import { TeamMembersProps } from "./team.types";

export default class TeamView extends ViewBuilder {
  private element: HTMLElement;
  private descriptionContainer: HTMLElement;
  private teamContainer: HTMLElement;
  private descriptionTeam: HTMLElement;
  private developer1: HTMLElement;
  private developer2: HTMLElement;
  private developer3: HTMLElement;
  private developer4: HTMLElement;

  constructor([
    gitHubLinkMentor,
    gitHubLinkTeamLead,
    gitHubLinkDeveloperFirst,
    gitHubLinkDeveloperSecond,
  ]: HTMLElement[]) {
    super();
    this.element = this.createElement("div", {
      classes: ["pt-4"],
    });
    this.descriptionContainer = this.createElement("div");
    this.teamContainer = this.createElement("div", {
      classes: ["d-flex", "flex-wrap", "justify-content-between", "mb-3"],
    });
    this.descriptionTeam = this.createDescription();
    const developers = [
      (this.developer1 = this.createMentor(gitHubLinkMentor)),
      (this.developer2 = this.createTeamLead(gitHubLinkTeamLead)),
      (this.developer3 = this.createDeveloperFirst(gitHubLinkDeveloperFirst)),
      (this.developer4 = this.createDeveloperSecond(gitHubLinkDeveloperSecond)),
    ];

    this.descriptionContainer.append(this.descriptionTeam);
    this.teamContainer.append(...developers);
    this.element.append(this.descriptionContainer, this.teamContainer);
  }

  private createDescription() {
    const description = this.createElement("div", {});
    const paragraphFirst = this.createElement("p", {
      classes: ["lead"],
    });
    const paragraphSecond = this.createElement("p", {
      classes: ["lead"],
    });

    const chunksFirst = [
      "We achieved success through effective collaboration within the our team.",
      "We held regular meetings to discuss the project's current status, exchange ideas",
      "and solve issues.",
      "Our openness to suggestions and willingness to help each other contributed to",
      "the successful implementation of the project.",
    ];

    const chunksSecond = [
      "Our project is the result of collective effort, creativity",
      "and the contributions of each team member. We take pride in",
      "our achievement and are ready for new challenges and projects.",
    ];

    paragraphFirst.textContent = chunksFirst.join("\n");
    paragraphSecond.textContent = chunksSecond.join("\n");
    description.append(paragraphFirst, paragraphSecond);

    return description;
  }

  private createMentor(gitHub: HTMLElement) {
    const container = this.createTeamMember({
      avatarPath: mentorImage,
      fullName: "Natalia Gulko",
      roles: "Mentor",
      bio: "Antalya, Turkey",
      gitHub,
    });

    return container;
  }

  private createTeamLead(gitHub: HTMLElement) {
    const container = this.createTeamMember({
      avatarPath: teamLeadImage,
      fullName: "Anton Gulko",
      roles: "Developer/Team Lead",
      bio: "Antalya, Turkey",
      gitHub,
    });

    return container;
  }

  private createDeveloperFirst(gitHub: HTMLElement) {
    const container = this.createTeamMember({
      avatarPath: createDeveloperFirst,
      fullName: "Nikita Starnoussov",
      roles: "Developer",
      bio: "Uralsk, Kazakhstan",
      gitHub,
    });

    return container;
  }

  private createDeveloperSecond(gitHub: HTMLElement) {
    const container = this.createTeamMember({
      avatarPath: createDeveloperSecond,
      fullName: "Aleksey Semyachkin",
      roles: "Developer",
      bio: "Belgorod, Russia",
      gitHub,
    });

    return container;
  }

  createTeamMember({ avatarPath, fullName, roles, bio, gitHub }: TeamMembersProps) {
    const container = this.createElement("div", {
      classes: ["card-animation", "p-4", "col-md-6", "col-lg-3", "col-sm-12"],
    });
    const image = this.createImageElement(avatarPath);
    const name = this.createElement("h4");
    name.textContent = fullName;
    const role = this.createElement("h6");
    role.textContent = roles;
    const shortBio = this.createElement("p");
    shortBio.textContent = bio;
    const gitHubLink = gitHub;

    container.append(image, name, role, shortBio, gitHubLink);

    return container;
  }

  private createImageElement(avatarPath: string) {
    const imageElement = this.createElement<HTMLImageElement>("img", {
      classes: ["card-img-top", "object-fit-cover", "mb-3"],
    });
    imageElement.alt = "Developer avatar";
    imageElement.height = 350;
    imageElement.src = avatarPath;

    imageElement.onerror = () => {
      imageElement.src = fallbackImage;
    };

    return imageElement;
  }

  render() {
    this.appendTo("#about-us", this.element);
  }
}
