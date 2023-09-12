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
  private developersData: TeamMembersProps[] = [];

  constructor(devLinks: HTMLElement[]) {
    super();
    this.element = this.createElement("div", {
      classes: ["pt-4"],
    });
    this.descriptionContainer = this.createElement("div");
    this.teamContainer = this.createElement("div", {
      classes: ["d-flex", "flex-wrap", "justify-content-between", "mb-3"],
    });
    this.descriptionTeam = this.createDescription();
    this.developersData = this.createDevelopersData(devLinks);

    this.descriptionContainer.append(this.descriptionTeam);
    this.teamContainer.append(...this.createDevelopers());
    this.element.append(this.descriptionContainer, this.teamContainer);
  }

  private createDescription() {
    const description = this.createElement("div", {});

    const paragraphs = [
      [
        "We achieved success through effective collaboration within the our team.",
        "We held regular meetings to discuss the project's current status, exchange ideas",
        "and solve issues.",
        "Our openness to suggestions and willingness to help each other contributed to",
        "the successful implementation of the project.",
      ],
      [
        "Our project is the result of collective effort, creativity",
        "and the contributions of each team member. We take pride in",
        "our achievement and are ready for new challenges and projects.",
      ],
    ];

    paragraphs.forEach((chunk) => {
      const paragraph = this.createElement("p", {
        classes: ["lead"],
      });
      paragraph.textContent = chunk.join("\n");
      description.append(paragraph);
    });

    return description;
  }

  private createDevelopersData(devLinks: HTMLElement[]): TeamMembersProps[] {
    return [
      {
        avatarPath: mentorImage,
        fullName: "Natalia Gulko",
        roles: "Mentor",
        gitHub: devLinks[0],
      },
      {
        avatarPath: teamLeadImage,
        fullName: "Anton Gulko",
        roles: "Developer/Team Lead",
        bio: this.membersBio.anton.join("\n"),
        gitHub: devLinks[1],
      },
      {
        avatarPath: createDeveloperFirst,
        fullName: "Nikita Starnoussov",
        roles: "Developer",
        bio: this.membersBio.nikita.join("\n"),
        gitHub: devLinks[2],
      },
      {
        avatarPath: createDeveloperSecond,
        fullName: "Aleksey Semyachkin",
        roles: "Developer",
        bio: this.membersBio.aleksey.join("\n"),
        gitHub: devLinks[3],
      },
    ];
  }

  membersBio = {
    anton: [
      "Anton, our proactive team lead, has been the anchor of our project's journey.",
      "Beyond shaping the project's vision, he showcased his technical prowess by",
      "masterfully implementing the user-profile page, the intuitive cart system,",
      "and the detailed product page. His attention to detail and commitment shines",
      "through in every feature he's touched. Leading us through every challenge,",
      "Tony's blend of leadership and technical expertise ensured our project's success.",
    ],
    nikita: [
      "Nikita, another of our promising junior frontend developers, is the embodiment of",
      "ambition and skill. Young yet incredibly adept, his drive to be the best is palpable",
      "in every task he undertakes. Nikita was the mastermind behind our seamless login page,",
      " intuitive navigation to categories, and the robust validation processes. Every line",
      "of code he writes echoes his dedication and eagerness to excel. With such passion, ",
      "there's no doubt that the sky's the limit for him in the tech world.",
    ],
    aleksey: [
      "Aleksey, our dedicated junior frontend developer, truly exemplified the spirit of",
      "commitment. Despite being newer to the scene, he often burned the midnight oil to ",
      "perfect our app's filtration system and meticulously craft the registration pages. ",
      "His tenacity and passion shine through in every feature he touched. Aleksey's hard",
      "work and drive have been instrumental in elevating the user experience of our project,",
      "proving that determination often outweighs experience.",
    ],
  };

  private createDevelopers() {
    return this.developersData.map((data) => this.createTeamMember(data));
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

    if (bio) {
      shortBio.textContent = bio;
    }
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
