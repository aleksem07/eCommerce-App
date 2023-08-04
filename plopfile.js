function addActions(data, src) {
  const actions = [
    {
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.ts`,
      templateFile: `templates/${src}/component.ts.txt`,
    },
    {
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.test.ts`,
      templateFile: `templates/${src}/test.ts.txt`,
    },
  ];

  if (data.addStyles && (src === "components" || src === "pages")) {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.scss`,
      template: "",
    });
  }

  if (data.addTypes) {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.types.ts`,
      template: "",
    });
  }

  if (data.addMst && (src === "components" || src === "pages")) {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.mst`,
      templateFile: `templates/${src}/component.mst.txt`,
    });
  }

  return actions;
}
const promptsDOM = [
  {
    type: "input",
    name: "name",
    message: "Enter the component name (in PascalCase):",
    validate: (value) => {
      if (/^[A-Z][A-Za-z]*$/.test(value)) {
        return true;
      }
      return "Invalid component name. Must be in PascalCase and start with a capital letter.";
    },
  },
  {
    type: "confirm",
    name: "addStyles",
    message: "Do you want to add an SCSS file?",
    default: false,
  },
  {
    type: "confirm",
    name: "addMst",
    message: "Do you want to add a .mst file?",
    default: false,
  },
  {
    type: "confirm",
    name: "addTypes",
    message: "Do you want to add a *.types.ts file?",
    default: false,
  },
];

const promptsWithoutDOM = [
  {
    type: "input",
    name: "name",
    message: "Enter the component name (in PascalCase):",
    validate: (value) => {
      if (/^[A-Z][A-Za-z]*$/.test(value)) {
        return true;
      }
      return "Invalid component name. Must be in PascalCase and start with a capital letter.";
    },
  },
  {
    type: "confirm",
    name: "addTypes",
    message: "Do you want to add a *.types.ts file?",
    default: false,
  },
];

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: promptsDOM,
    actions: (data) => {
      const res = addActions(data, "components");
      return res;
    },
  });
  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts: promptsDOM,
    actions: (data) => {
      const res = addActions(data, "pages");
      return res;
    },
  });
  plop.setGenerator("service", {
    description: "Generate a new service",
    prompts: promptsWithoutDOM,
    actions: (data) => {
      const res = addActions(data, "services");
      return res;
    },
  });
  plop.setGenerator("util", {
    description: "Generate a new util",
    prompts: promptsWithoutDOM,
    actions: (data) => {
      const res = addActions(data, "utils");
      return res;
    },
  });
};
